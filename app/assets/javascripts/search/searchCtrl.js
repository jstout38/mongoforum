angular.module('stoutForum')
 .controller('SearchCtrl', [
 	'$scope',
 	'$state',
 	'posts',
 	function($scope, $state, posts){
 		$scope.results = posts.posts
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
 		$scope.search = function() {
 			posts.search($scope.search_hash).then(function(res){
 				$scope.results = res.data;
 				console.log($scope.results);
 				return res;
 			});//, function(errors){
 			//	$scope.responseMessage = errors.data;
 			//});
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