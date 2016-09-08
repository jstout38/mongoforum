angular.module('stoutForum')
.controller('ForumThreadCtrl', [
 '$scope',
 'forum_threads',
 'forum_thread',
 'posts',
 'Auth',
 '$stateParams',
 '$location',
 '$anchorScroll',
 '$document',
 function($scope, forum_threads, forum_thread, posts, Auth, $stateParams, $location, $anchorScroll, $document){
   
   $scope.forum_thread = forum_thread;
   $scope.posts = posts.posts;
   $scope.current_page = $stateParams.page;
   $scope.showAllPosts = false;
   $scope.posts_in_thread = forum_thread.posts.length;   
        
   $document.ready(function(){
      urlParts = $location.absUrl().split('#');
      if (urlParts.length > 2) {      
         $location.hash(urlParts[2]);
         $anchorScroll();      
      }
   });
   $scope.addPost = function(){      
      if(!$scope.body || $scope.body === '') {return;}
      last_page = Math.floor( $scope.posts_in_thread / 10) + 1;      
      posts.create({
         body: $scope.body         
      }, $scope.forum_thread, last_page);
      $scope.body = '';
      $scope.posts_in_thread++;
   };
   $scope.hasAvatar = function(post){
      if (post.user.avatar == "") {
         return false;
      }      
      return true;
   };
   $scope.hasTwitter = function(post){
      if (post.user.twitter == "") {
         return false;
      }
      return true;
   };
   $scope.hasFacebook = function(post){
      if (post.user.facebook == "") {
         return false;
      }
      return true;
   };
   $scope.hasPinterest = function(post){
      if (post.user.pinterest == "") {
         return false;
      }
      return true;
   };
   $scope.hasLinkedIn = function(post){
      if (post.user.linked_in == "") {
         return false;
      }
      return true;
   };
   $scope.hasSignature = function(post){
      if (post.user.signature == "") {
         return false;
      }
      return true;
   };
   $scope.incrementUpvotes = function(forum_thread, post) {
       posts.upvote(forum_thread, post);
     };
   $scope.incrementDownvotes = function(forum_thread, post) {
      posts.downvote(forum_thread, post);
   };
   $scope.isLoggedIn = function(){
      return Auth.isAuthenticated();   
   };
   $scope.pagesArray = function(thread){
      var pages = [];
      var pageCount = Math.floor((thread.posts.length - 1) / 10 ) + 1;
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
         for (var i = 1; i <= pageCount; i++) {
            pages.push(i);
         }
      }
      return pages;
   };
   $scope.showPosts = function(container){
      $scope.showAllPosts = true;
   };
   //$scope.addPost = function(){
   //	 if(!$scope.title || $scope.title === '') { return; }
   //	 $scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0, comments: [ {author: 'Joe', body: 'Cool post!', upvotes: 0}, {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}]});
   //	 $scope.title = '';
   //	 $scope.link = '';
   //};
   //$scope.incrementUpvotes = function(post) {
   //  post.upvotes += 1;

   }
 ]);