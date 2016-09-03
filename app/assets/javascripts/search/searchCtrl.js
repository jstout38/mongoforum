angular.module('stoutForum')
 .controller('SearchCtrl', [
 	'$scope',
 	'$state',
 	'posts',
 	function($scope, $state, posts){
 		
 		//$scope.results = ""
 		//$scope.thread_results = ""
 		//$scope.user = {}
 		//$scope.user.birthday = new Date();
 		//$scope.hasAvatar = function() {
 		//	if ($scope.user.avatar != null && $scope.user.avatar != "") {
 		//		return true;
 		//	}
 		//	return false;
 		//};
 		//$scope.clearError = function() {
 		//	$(".errorMessages").hide();
 		//};
 		//$scope.showError = function() {
 		//	$(".errorMessages").show();
 		//};
 		$scope.search = function(post_page, thread_page) {
 			$scope.current_page_posts = post_page;
 			$scope.current_page_threads = thread_page;
 			posts.search($scope.search_hash, post_page, thread_page).then(function(res){
 				$scope.results = res.data.posts;
 				$scope.thread_results = res.data.threads;
 				$scope.post_count = res.data.post_count;
 				$scope.forum_thread_count = res.data.forum_thread_count; 				
 			});//, function(errors){
 			//	$scope.responseMessage = errors.data;
 			//});
 		};
 		$scope.pagesArray = function(post_count){
      		var pages = [];
      		var pageCount = post_count / 10;
      		for (var i = 0; i < pageCount; i++) {
         		pages.push(i + 1);
      		}
      		return pages;
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