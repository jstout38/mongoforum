angular.module('stoutForum')
    .controller('MainCtrl', [
        '$scope',
        'sub_forums',
        function ($scope, sub_forums) {
            //Set the scope array to the SubForums resolved in the routing
            $scope.sub_forums = sub_forums.sub_forums;
        }
    ]);