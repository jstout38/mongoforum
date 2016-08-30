angular.module('stoutForum', ['ui.router', 'ngMaterial', 'ngMessages', 'templates', 'Devise'])
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
          url: '/sub_forums/{id}/{page}',
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
              return forum_threads.getAll($stateParams.id, $stateParams.page);
            }]
          }
        })
        .state('forum_threads', {
  		    url: '/sub_forums/{sub_forum_id}/forum_threads/{id}/{page}',
  		    templateUrl: 'forum_threads/_forum_threads.html',
  		    controller: 'ForumThreadCtrl',
          resolve: {
            forum_thread: ['$stateParams', 'forum_threads', function($stateParams, forum_threads) {
              return forum_threads.get($stateParams.id, $stateParams.sub_forum_id);
            }],
            postPromise: ['$stateParams', 'posts', function($stateParams, posts){               
              return posts.getAll($stateParams.sub_forum_id, $stateParams.id, $stateParams.page);
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
            user: ['Auth', 'users_admin', function(Auth, users_admin) {
              return Auth.currentUser().then(function(user){                
                return users_admin.get(user._id);
              })
            }],
            postPromise: ['users_admin', function(users_admin){
              return users_admin.getAll();
            }]
          }
        })
        .state('users_admin_edit', {
          url: '/users_admin/edit',
          templateUrl: 'users_admin/_users_admin_edit.html',
          controller: 'UsersAdminCtrl',
          resolve: {
            user: ['Auth', 'users_admin', function(Auth, users_admin) {
              return Auth.currentUser().then(function(user){                
                return users_admin.get(user._id);
              })
            }]
          },
        
          onEnter: ['$state', 'Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('users_admin_edit');
            }, function(error){
              $state.go('home');
            })
          }]
        })
        .state('users', {
          url: '/users_admin/{id}',
          templateUrl: 'users_admin/_users_show.html',
          controller: 'UsersAdminCtrl',
          resolve: {
            user: ['$stateParams', 'Auth', 'users_admin', function($stateParams, Auth, users_admin) {
              return users_admin.get($stateParams.id);
            }]
          }
        });

  		$urlRouterProvider.otherwise('home');
  	}]);

  

 