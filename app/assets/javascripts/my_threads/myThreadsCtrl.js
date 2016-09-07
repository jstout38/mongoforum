angular.module('stoutForum')
 .controller('myThreadsCtrl', [
 	'$scope',
 	'$state',
 	'posts',
   'results',
   '$location',   
 	function($scope, $state, posts, results, $location){
 		$scope.current_page_threads = results.current_page_threads;
      $scope.thread_results = results.thread_results;
      $scope.forum_thread_count = results.forum_thread_count;      
      
      $scope.pagesArray = function(post_count, type){
      		var pages = [];
      		
      		if (type == "thread") {
      			var current_page = $scope.current_page_threads;
      		}
      		var pageCount = Math.floor((post_count - 1) / 10 ) + 1;
      if (pageCount > 6 && current_page < 3) {
         pages = [1, 2, 3, "...", pageCount];
      }
      else if (pageCount > 6 && current_page == 3) {
         pages = [1, 2, 3, 4, "...", pageCount];
      }
      else if (pageCount > 6 && current_page >= 4 && current_page < pageCount - 2) {
         pages = [1, "...", current_page - 1, current_page, parseInt(current_page) + 1, "...", pageCount];
      }
      else if (pageCount > 6 && current_page == pageCount - 2) {
         pages = [1, "...", current_page -1, pageCount - 2, pageCount - 1, pageCount];
      }
      else if (pageCount > 6 && current_page > pageCount - 2) {
         pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
      }
      else {
         for (var i = 1; i <= pageCount; i++) {
            pages.push(i);
         }
      }
      return pages;
   		};
      $scope.go = function ( path ) {
         $location.path( path );
      };
      $scope.pageCount = function(post_count){
         return Math.floor((post_count - 1) / 10) + 1;
      };
 		//$scope.register = function() { 			
 		//	Auth.register($scope.user).then(function(){
 		//		$state.go('home');
 		//	}, function(errors){
 		//		$scope.emailResponses = errors.data.errors["email"];
 		//		$scope.usernameResponses = errors.data.errors["username"];
 		//		$scope.passwordResponses = errors.data.errors["password"]; 				
 		//	});
 		//};
 	}]);