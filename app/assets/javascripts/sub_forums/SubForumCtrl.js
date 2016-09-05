angular.module('stoutForum')
.controller('SubForumCtrl', [
 '$scope',
 'sub_forums',
 'sub_forum',
 'forum_threads',
 'Auth',
 '$stateParams',
 '$document',
 function($scope, sub_forums, sub_forum, forum_threads, Auth, $stateParams, $document){
   
   $scope.current_page = $stateParams.page
   $scope.sub_forum = sub_forum;   
   $scope.forum_threads = forum_threads.forum_threads;
   $scope.thread = {topic: '', post: ''}
   $scope.addThread = function(){
      if(!$scope.thread.topic || $scope.thread.topic === '') {return;}
      forum_threads.create({
         title: $scope.thread.topic,
         post: $scope.thread.post          
      }, $scope.sub_forum);
      $scope.title = '';
   };
   $scope.isLoggedIn = function(){
      return Auth.isAuthenticated();   
   };
   $scope.pagesArray = function(thread){
      var pages = [];
      var pageCount = Math.floor((thread.posts.length - 1) / 10 ) + 1;
      if (pageCount > 6) {
         pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
      }
      else {
         for (var i = 0; i < pageCount; i++) {
            pages.push(i + 1);
         }
      }
      return pages;
   };
   $scope.threadsArray = function(sub_forum){
      var pages = [];
      var pageCount = Math.floor((sub_forum.forum_threads.length - 1) / 10 ) + 1;
      if (pageCount > 6 && $scope.current_page < 3) {
         pages = [1, 2, 3, "...", pageCount];
      }
      else if (pageCount > 6 && $scope.current_page == 3) {
         pages = [1, 2, 3, 4, "...", pageCount];
      }
      else if (pageCount > 6 && $scope.current_page >= 4 && $scope.current_page < pageCount - 2) {
         pages = [1, "...", $scope.current_page - 1, $scope.current_page, parseInt($scope.current_page) + 1, "...", pageCount];
      }
      else if (pageCount > 6 && $scope.current_page == pageCount - 2) {
         pages = [1, "...", $scope.current_page -1, pageCount - 2, pageCount - 1, pageCount];
      }
      else if (pageCount > 6 && $scope.current_page > pageCount - 2) {
         pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
      }
      else {
         for (var i = 1; i < pageCount; i++) {
            pages.push(i);
         }
      }
   };   
}
   //$scope.addPost = function(){
   //	 if(!$scope.title || $scope.title === '') { return; }
   //	 $scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0, comments: [ {author: 'Joe', body: 'Cool post!', upvotes: 0}, {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}]});
   //	 $scope.title = '';
   //	 $scope.link = '';
   //};
   //$scope.incrementUpvotes = function(post) {
   //  post.upvotes += 1;
   
 ]);