angular.module('stoutForum')
    .factory('sub_forums', [
        '$http',
        function ($http) {
            //Initialize an empty array to hold SubForums
            var o = {sub_forums: []};
            o.getAll = function () {
                //Call the API to get an array of all SubForums
                return $http.get('/sub_forums.json').success(function (data) {
                    angular.copy(data, o.sub_forums);
                });
            };
            o.get = function (id) {
                //Call the API to get one SubForum with the passed id
                return $http.get('/sub_forums/' + id + '.json').then(function (res) {
                    return res.data;
                });
            };
            return o;
        }
    ]);
