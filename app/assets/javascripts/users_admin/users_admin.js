angular.module('stoutForum')
    .factory('users_admin', [
        '$http',
        function ($http) {
            //Set a variable for holding the current pages posts and post counts
            var o = {users_admin: [], userCount: 0};
            o.getAll = function (page) {
                //Call the API to get all users
                return $http.get('/users_admin/index/' + page).success(function (data) {
                    angular.copy(data.users, o.users_admin);
                    o.userCount = data.userCount;
                });
            };
            o.update = function (body, user) {
                //Call the API to update the user
                return $http.put('/users_admin/' + user._id + '.json', body);
            };
            o.get = function (user) {
                //Call the API to get a single user
                return $http.get('/users_admin/' + user + '.json').success(function (data) {
                    return data;
                });
            };
            return o;
        }
    ]);
