angular.module('stoutForum')
    .factory('posts', [
        '$http',
        function ($http) {
            //Initialize an array for posts to be placed in
            var o = {posts: []};
            o.getAll = function (sub_forum_id, id, page) {
                //Call the API to retrieve all posts for the current thread
                return $http.get('/sub_forums/' + sub_forum_id + '/forum_threads/' + id + '/posts/index/' + page + '.json').success(function (data) {
                    angular.copy(data, o.posts);
                });
            };
            o.create = function (body, forum_thread, last_page) {
                //Call the API to create a new post
                return $http.post('/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/posts.json', body).success(function (data) {
                    //Redirect to the new page if the new post starts a new page
                    if (o.posts.length > 9) {
                        window.location.href = '#/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/' + last_page;
                    }
                    //Add the post to the current page and update the post count for the poster on the page
                    o.posts.push(data);
                    var currentUser = o.posts[o.posts.length - 1].user.id;
                    for (post in o.posts) {
                        if (post.upvotes.id == currentUser) {
                            post.user.postCount++;
                        }
                    }
                });
            };
            o.upvote = function (forum_thread, post) {
                //Call the API to update a post's votes based on an upvote
                return $http.put('/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/posts/' + post._id + '/upvote.json').then(function (data) {
                    if (data.status == 200) {
                        post.upvotes += 1;
                    }
                });
            };
            o.downvote = function (forum_thread, post) {
                //Call the API to update a post's votes based on a downvote
                return $http.put('/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/posts/' + post._id + '/downvote.json').then(function (data) {
                    if (data.status == 200) {
                        post.downvotes += 1;
                    }
                });
            };
            o.search = function (search_hash, post_page, thread_page) {
                //Clean up the hash results so that they work properly with the API
                var keyword = search_hash.post_search;
                var user = search_hash.user_search;
                var time = search_hash.time;
                var topic = search_hash.thread_search;
                if (search_hash.post_search == "") {
                    keyword = "undefined";
                }
                if (search_hash.user_search == "") {
                    user = "undefined";
                }
                if (search_hash.thread_search == "") {
                    topic = "undefined";
                }
                //Call the API to get results based on the above parameters
                return $http.get('/search/' + post_page + '/' + thread_page + '/' + time + '/' + keyword + '/' + user + '/' + topic);
            };
            return o;
        }
    ]);