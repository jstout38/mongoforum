angular.module('stoutForum')
    .controller('NavCtrl', [
        '$scope',
        '$state',
        'Auth',
        function ($scope, $state, Auth) {
            //Set scope variables using Devise Auth module
            $scope.signedIn = Auth.isAuthenticated;
            $scope.logout = Auth.logout;
            Auth.currentUser().then(function (user) {
                //Set the current user using Devise Auth module
                $scope.user = user;
            });
            $scope.$on('devise:new-registration', function (e, user) {
                //Set the current user when the user registers
                $scope.user = user;
            });
            $scope.$on('devise:login', function (e, user) {
                //Set the current user when the user logs in
                $scope.user = user;
            });
            $scope.$on('devise:logout', function (e, user) {
                //Clear the current user and go home when the user logs out
                $scope.user = {};
                $state.go('home');
            });
        }
    ]);