angular.module('stoutForum')
 .controller('AuthCtrl', [
 	'$scope',
 	'$state',
 	'Auth',
 	function($scope, $state, Auth){
 		$scope.user = {}
 		$scope.user.birthday = new Date();
 		$scope.hasAvatar = function() {
 			if ($scope.user.avatar != null && $scope.user.avatar != "") {
 				return true;
 			}
 			return false;
 		};
 		$scope.clearError = function() {
 			$(".errorMessages").hide();
 		};
 		$scope.showError = function() {
 			$(".errorMessages").show();
 		};
 		$scope.login = function() {
 			Auth.login($scope.user).then(function(){
 				$state.go('home');
 			}, function(errors){
 				$scope.responseMessage = errors.data;
 			});
 		};
 		$scope.register = function() { 			
 			Auth.register($scope.user).then(function(){
 				$state.go('home');
 			}, function(errors){
 				$scope.emailResponses = errors.data.errors["email"];
 				$scope.usernameResponses = errors.data.errors["username"];
 				$scope.passwordResponses = errors.data.errors["password"]; 				
 			});
 		};
 	}]);