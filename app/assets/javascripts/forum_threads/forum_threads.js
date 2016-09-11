angular.module('stoutForum')
    .factory('forum_threads', [
        '$http',
        function ($http) {
            //Initialize an array to hold the paginated ForumThreads
            var o = {forum_threads: []};
            o.getAll = function (sub_forum, page) {
                //Call the API to retrieve all the forum threads for a SubForum
                return $http.get('/sub_forums/' + sub_forum + '/forum_threads/index/' + page + '.json').success(function (data) {
                    //Add the results to the threads array
                    angular.copy(data, o.forum_threads);
                });
            };
            o.get = function (id, sub_forum) {
                //Call the API to retrieve a single forum thread by id
                return $http.get('/sub_forums/' + sub_forum + '/forum_threads/' + id + '.json').then(function (res) {
                    //Return the thread
                    return res.data;
                });
            };
            o.create = function (thread, sub_forum) {
                //Call the API to retrieve a single forum thread by id
                return $http.post('/sub_forums/' + sub_forum._id + '/forum_threads.json', thread).success(function (data) {
                    //Navigate to the page where the new thread is located
                    var newURL = '#/sub_forums/' + sub_forum._id + '/1';
                    window.location.href = newURL;
                    window.location.reload(newURL);
                });
            };
            return o;
        }
    ]);