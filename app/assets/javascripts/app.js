angular.module('stoutForum', ['ui.router', 'templates', 'Devise'])
  .config([
  	'$stateProvider',
  	'$urlRouterProvider',
  	function($stateProvider, $urlRouterProvider) {

  		$stateProvider
  		  .state('home', {
  		  	url: '/home',
  		  	templateUrl: 'home/_home.html',
  		  	controller: 'MainCtrl',
          resolve: {
            postPromise: ['sub_forums', function(sub_forums){
              return sub_forums.getAll();
            }]
          }
  		  })
  		  .state('sub_forums', {
          url: '/sub_forums/{id}',
          templateUrl: 'sub_forums/_sub_forums.html',
          controller: 'SubForumCtrl',
          resolve: {
            sub_forum: ['$stateParams', 'sub_forums', function($stateParams, sub_forums) {
              return sub_forums.get($stateParams.id);
            }],
          //},
          //resolve: {
            //forum_threads: ['$stateParams', 'forum_threads', function($stateParams, forum_threads) {
            //  return forum_threads.getAll($stateParams.id);
            //}]
            postPromise: ['$stateParams', 'forum_threads', function($stateParams, forum_threads){
              return forum_threads.getAll($stateParams.id);
            }]
          }
        })
        .state('forum_threads', {
  		    url: '/sub_forums/{sub_forum_id}/forum_threads/{id}',
  		    templateUrl: 'forum_threads/_forum_threads.html',
  		    controller: 'ForumThreadCtrl',
          resolve: {
            forum_thread: ['$stateParams', 'forum_threads', function($stateParams, forum_threads) {
              return forum_threads.get($stateParams.id, $stateParams.sub_forum_id);
            }],
            postPromise: ['$stateParams', 'posts', function($stateParams, posts){
              return posts.getAll($stateParams.sub_forum_id, $stateParams.id);
            }]
          }
  		  })
        //.state('posts', {
        //  url: '/sub_forums/{sub_forum_id}/forum_threads/{forum_thread_id}/posts',
        //  templateUrl: 'posts/_posts.html',
        //  controller: 'PostCtrl',

        //});
        .state('login', {
          url: '/login',
          templateUrl: 'auth/_login.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('home');
            })
          }]
        })
        .state('register', {
          url: '/register',
          templateUrl: 'auth/_register.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('home');
            })
          }]
        })
        .state('users_admin', {
          url: '/users_admin',
          templateUrl: 'users_admin/_users_admin.html',
          controller: 'UsersAdminCtrl',
          resolve: {
            postPromise: ['users_admin', function(users_admin){
              return users_admin.getAll();
            }]
          }
        });

  		$urlRouterProvider.otherwise('home');
  	}]);

  

 