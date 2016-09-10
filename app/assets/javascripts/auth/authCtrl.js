angular.module('stoutForum')
    .controller('AuthCtrl', [
        '$scope',
        '$state',
        'Auth',
        function ($scope, $state, Auth) {
            //Initialize user hash and date object for birthdate
            $scope.user = {};
            $scope.user.birthday = new Date();
            $scope.hasAvatar = function () {
                //Check if the user has an avatar
                if ($scope.user.avatar !== null && $scope.user.avatar !== "") {
                    return true;
                }
                return false;
            };
            $scope.clearError = function () {
                //Function to be called when errors must be cleared
                $(".errorMessages").hide();
            };
            $scope.showError = function () {
                //Function to be called when errors must be shown
                $(".errorMessages").show();
            };
            $scope.login = function () {
                //Use Devise Auth to log a user in using the hash provided by the form then go home, or provide errors to the client
                Auth.login($scope.user).then(function () {
                    $state.go('home');
                }, function (errors) {
                    $scope.responseMessage = errors.data;
                });
            };
            $scope.register = function () {
                //Use Devise Auth to register a user using the hash provided by the form then go home, or provide errors to the client
                Auth.register($scope.user).then(function () {
                    $state.go('home');
                }, function (errors) {
                    $scope.emailResponses = errors.data.errors.email;
                    $scope.usernameResponses = errors.data.errors.username;
                    $scope.passwordResponses = errors.data.errors.password;
                });
            };
        }
    ]);