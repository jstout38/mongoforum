angular.module('stoutForum')
    .controller('SubForumCtrl', [
        '$scope',
        'sub_forum',
        'forum_threads',
        'Auth',
        '$stateParams',
        function ($scope, sub_forum, forum_threads, Auth, $stateParams) {
            //Set current page based on the URL params, set current SubForum and paginated array of ForumThreads based on resolve in routing
            $scope.current_page = $stateParams.page;
            $scope.sub_forum = sub_forum;
            $scope.forum_threads = forum_threads.forum_threads;
            $scope.thread = {topic: '', post: ''};
            $scope.addThread = function () {
                //Create a new thread using the hash passed by the form
                if (!$scope.thread.topic || $scope.thread.topic === '') {return;}
                forum_threads.create({
                    title: $scope.thread.topic,
                    post: $scope.thread.post
                }, $scope.sub_forum);
                //Clear the hash for future use
                $scope.title = '';
            };
            $scope.isLoggedIn = function () {
                //Check whether the user is logged in
                return Auth.isAuthenticated();
            };
            $scope.pagesArray = function (thread) {
                //Return the array for displaying the pages of the thread under the thread topic
                var pages = [];
                var pageCount = Math.floor((thread.posts.length - 1) / 10) + 1;
                if (pageCount > 6) {
                    pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
                } else {
                    for (var i = 0; i < pageCount; i++) {
                        pages.push(i + 1);
                    }
                }
                return pages;
            };
            $scope.threadsArray = function (sub_forum) {
                //Return the array for displaying the pages of the forum
                var pages = [];
                var pageCount = Math.floor((sub_forum.forum_threads.length - 1) / 10) + 1;
                if (pageCount > 6 && $scope.current_page < 3) {
                    pages = [1, 2, 3, "...", pageCount];
                } else if (pageCount > 6 && $scope.current_page == 3) {
                    pages = [1, 2, 3, 4, "...", pageCount];
                } else if (pageCount > 6 && $scope.current_page >= 4 && $scope.current_page < pageCount - 2) {
                    pages = [1, "...", $scope.current_page - 1, $scope.current_page, parseInt($scope.current_page) + 1, "...", pageCount];
                } else if (pageCount > 6 && $scope.current_page == pageCount - 2) {
                    pages = [1, "...", $scope.current_page -1, pageCount - 2, pageCount - 1, pageCount];
                } else if (pageCount > 6 && $scope.current_page > pageCount - 2) {
                    pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
                } else {
                    for (var i = 1; i <= pageCount; i++) {
                        pages.push(i);
                    }
                }
                return pages;
            };
        }
    ]);