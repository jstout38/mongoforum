angular.module('stoutForum')
    .controller('SearchCtrl', [
        '$scope',
        'posts',
        function ($scope, posts) {
            //Get the paginated seearch results and put them in the scope variables
            $scope.search = function (post_page, thread_page) {
                $scope.current_page_posts = post_page;
                $scope.current_page_threads = thread_page;
                posts.search($scope.search_hash, post_page, thread_page).then(function (res) {
                    $scope.results = res.data.posts;
                    $scope.thread_results = res.data.threads;
                    $scope.post_count = res.data.post_count;
                    $scope.forum_thread_count = res.data.forum_thread_count;
                });
            };
            $scope.pagesArray = function (post_count, type) {
                //Check whether threads or posts are being paginated then return the array for displaying page navigation
                var pages = [];
                var current_page = 1;
                if (type == "post") {
                    current_page = $scope.current_page_posts;
                } else if (type == "thread") {
                    current_page = $scope.current_page_threads;
                }
                var pageCount = Math.floor((post_count - 1) / 10) + 1;
                if (pageCount > 6 && current_page < 3) {
                    pages = [1, 2, 3, "...", pageCount];
                } else if (pageCount > 6 && current_page == 3) {
                    pages = [1, 2, 3, 4, "...", pageCount];
                } else if (pageCount > 6 && current_page >= 4 && current_page < pageCount - 2) {
                    pages = [1, "...", current_page - 1, current_page, parseInt(current_page) + 1, "...", pageCount];
                } else if (pageCount > 6 && current_page == pageCount - 2) {
                    pages = [1, "...", current_page -1, pageCount - 2, pageCount - 1, pageCount];
                } else if (pageCount > 6 && current_page > pageCount - 2) {
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