//Config module for AngularJS, sets the routing for the client-side interface
angular.module('stoutForum', ['ui.router', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'templates', 'Devise'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    //Home page state, resolves the sub forums and displays them
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['sub_forums', function (sub_forums) {
                            return sub_forums.getAll();
                        }]
                    }
                })
                .state('sub_forums', {
                    //State for displaying the contents of a sub forum, resolves the current sub forum and the paginated threads within the sub forum
                    url: '/sub_forums/{id}/{page}',
                    templateUrl: 'sub_forums/_sub_forums.html',
                    controller: 'SubForumCtrl',
                    resolve: {
                        sub_forum: ['$stateParams', 'sub_forums', function ($stateParams, sub_forums) {
                            return sub_forums.get($stateParams.id);
                        }],
                        postPromise: ['$stateParams', 'forum_threads', function ($stateParams, forum_threads) {
                            return forum_threads.getAll($stateParams.id, $stateParams.page);
                        }]
                    }
                })
                .state('forum_threads', {
                    //State for displaying the contents of a forum thread, resolves the current forum thread and the paginated posts within the forum thread
                    url: '/sub_forums/{sub_forum_id}/forum_threads/{id}/{page}',
                    templateUrl: 'forum_threads/_forum_threads.html',
                    controller: 'ForumThreadCtrl',
                    resolve: {
                        forum_thread: ['$stateParams', 'forum_threads', function ($stateParams, forum_threads) {
                            return forum_threads.get($stateParams.id, $stateParams.sub_forum_id);
                        }],
                        postPromise: ['$stateParams', 'posts', function ($stateParams, posts) {
                            return posts.getAll($stateParams.sub_forum_id, $stateParams.id, $stateParams.page);
                        }]
                    }
                })
                .state('login', {
                    //State for logging in using the Devise Auth protocol, goes to the home page after logging in
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function ($state, Auth) {
                        Auth.currentUser().then(function () {
                            $state.go('home');
                        });
                    }]
                })
                .state('register', {
                    //State for registering using the Devise Auth protocol, goes to the home page after loggin in
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function ($state, Auth) {
                        Auth.currentUser().then(function () {
                            $state.go('home');
                        });
                    }]
                })
                .state('users_admin', {
                    //State for the users index, resolves the current user and the paginated list of all users
                    url: '/users_admin/{page}',
                    templateUrl: 'users_admin/_users_admin.html',
                    controller: 'UsersAdminCtrl',
                    resolve: {
                        user: ['Auth', 'users_admin', function (Auth, users_admin) {
                            return Auth.currentUser().then(function (user) {
                                return users_admin.get(user._id);
                            });
                        }],
                        postPromise: ['users_admin', '$stateParams', function (users_admin, $stateParams) {
                            return users_admin.getAll($stateParams.page);
                        }]
                    }
                })
                .state('users_admin_edit', {
                    //State for editing the current user's information, resolves the current user and goes home after updating the user
                    url: '/users_admin/user/edit',
                    templateUrl: 'users_admin/_users_admin_edit.html',
                    controller: 'UsersAdminCtrl',
                    resolve: {
                        user: ['Auth', 'users_admin', function (Auth, users_admin) {
                            return Auth.currentUser().then(function (user) {
                                return users_admin.get(user._id);
                            });
                        }]
                    },
                    onEnter: ['$state', 'Auth', function ($state, Auth) {
                        Auth.currentUser().then(function () {
                            $state.go('users_admin_edit');
                        }, function (error) {
                            console.log(error);
                            $state.go('home');
                        });
                    }]
                })
                .state('users', {
                    //State for showing a user's profile, resolves the user being displayed
                    url: '/users_admin/user/{id}',
                    templateUrl: 'users_admin/_users_show.html',
                    controller: 'UsersAdminCtrl',
                    resolve: {
                        user: ['$stateParams', 'users_admin', function ($stateParams, users_admin) {
                            return users_admin.get($stateParams.id);
                        }]
                    }
                })
                .state('search', {
                    //State for searching, resolves the posts variable as an empty array so that it is ready to receive posts from the controller
                    url: '/search',
                    templateUrl: 'search/_search.html',
                    controller: 'SearchCtrl',
                    resolve: {
                        posts: ['posts', function (posts) {
                            posts.posts = [];
                            return posts;
                        }]
                    }
                })
                .state('my_threads', {
                    //State for showing the current user's threads, resolves the paginated threads created by the current user
                    url: '/my_threads/{page}',
                    templateUrl: 'my_threads/_my_threads.html',
                    controller: 'myThreadsCtrl',
                    resolve: {
                        results: ['Auth', '$stateParams', 'posts', function (Auth, $stateParams, posts) {
                            return Auth.currentUser().then(function (user) {
                                var username = user.username;
                                var results = {};
                                results.current_page_threads = $stateParams.page;
                                var search_hash = {user_search: username, time: 0};
                                var final_results = posts.search(search_hash, 1, $stateParams.page).then(function (res) {
                                    results.thread_results = res.data.threads;
                                    results.forum_thread_count = res.data.forum_thread_count;
                                    return results;
                                });
                                return final_results;
                            });
                        }]
                    }
                });

            //Returns the user to the home page if given a bad URL
            $urlRouterProvider.otherwise('home');

        }
    ]);