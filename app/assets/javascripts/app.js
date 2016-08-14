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
  		  .state('posts', {
  		    url: '/posts/{id}',
  		    templateUrl: 'posts/_posts.html',
  		    controller: 'PostsCtrl'
  		  });

  		$urlRouterProvider.otherwise('home');
  	}]);

  

 