angular.module('stoutForum')
.controller('ForumThreadCtrl', [
 '$scope',
 'forum_threads',
 'forum_thread',
 'posts',
 function($scope, forum_threads, forum_thread, posts){
   
   $scope.forum_thread = forum_thread;
   $scope.posts = posts.posts
   $scope.addPost = function(){
      if(!$scope.body || $scope.body === '') {return;}
      posts.create({
         body: $scope.body         
      }, $scope.forum_thread);
      $scope.body = '';
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
   }
   $scope.incrementUpvotes = function(forum_thread, post) {
       posts.upvote(forum_thread, post);
     };
   $scope.incrementDownvotes = function(forum_thread, post) {
      posts.downvote(forum_thread, post);
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