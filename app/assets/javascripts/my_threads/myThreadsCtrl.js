angular.module('stoutForum')
    .controller('myThreadsCtrl', [
        '$scope',
        'results',
        '$location',
        function ($scope, results, $location) {
            //Set scope variables based on the results resolved during routing
            $scope.current_page_threads = results.current_page_threads;
            $scope.thread_results = results.thread_results;
            $scope.forum_thread_count = results.forum_thread_count;
            $scope.pagesArray = function (post_count, type) {
                //Return the page array for displaying the page navigation
                var pages = [];
                if (type == "thread") {
                    var current_page = $scope.current_page_threads;
                }
                var pageCount = Math.floor((post_count - 1) / 10) + 1;
                if (pageCount > 6 && current_page < 3) {
                    pages = [1, 2, 3, "...", pageCount];
                } else if (pageCount > 6 && current_page == 3) {
                    pages = [1, 2, 3, 4, "...", pageCount];
                } else if (pageCount > 6 && current_page >= 4 && current_page < pageCount - 2) {
                    pages = [1, "...", current_page - 1, current_page, parseInt(current_page) + 1, "...", pageCount];
                } else if (pageCount > 6 && current_page == pageCount - 2) {
                    pages = [1, "...", current_page - 1, pageCount - 2, pageCount - 1, pageCount];
                } else if (pageCount > 6 && current_page > pageCount - 2) {
                    pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
                } else {
                    for (var i = 1; i <= pageCount; i++) {
                        pages.push(i);
                    }
                }
                return pages;
            };
            $scope.go = function (path) {
                //Navigate to the passed path
                $location.path(path);
            };
            $scope.pageCount = function (post_count) {
                //Return the number of pages given the number of posts
                return Math.floor((post_count - 1) / 10) + 1;
            };
        }
    ]);