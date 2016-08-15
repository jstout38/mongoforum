angular.module('stoutForum', ['ui.router', 'templates'])
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
            }]//,
          //},
          //resolve: {
            //forum_threads: ['$stateParams', 'forum_threads', function($stateParams, forum_threads) {
            //  return forum_threads.getAll($stateParams.id);
            //}]
          }
        })
        .state('forum_threads', {
  		    url: '/sub_forums/{sub_forum_id}/forum_threads/{id}',
  		    templateUrl: 'forum_threads/_forum_threads.html',
  		    controller: 'ForumThreadCtrl',
          resolve: {
            forum_thread: ['$stateParams', 'forum_threads', function($stateParams, forum_threads) {
              return forum_threads.get($stateParams.id);
            }]
          }
  		  });

  		$urlRouterProvider.otherwise('home');
  	}]);

  

 