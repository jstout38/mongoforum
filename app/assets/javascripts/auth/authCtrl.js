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

 		$scope.login = function() {
 			Auth.login($scope.user).then(function(){
 				$state.go('home');
 			});
 		};

 		$scope.register = function() { 			
 			Auth.register($scope.user).then(function(){
 				$state.go('home');
 			});
 		};
 	}]);