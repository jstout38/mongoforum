angular.module('stoutForum')
 .controller('AuthCtrl', [
 	'$scope',
 	'$state',
 	'Auth',
 	function($scope, $state, Auth){
 		$scope.user = {}
 		$scope.user.birthday = new Date();

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