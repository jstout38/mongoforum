angular.module('stoutForum')
.controller('SubForumCtrl', [
 '$scope',
 'sub_forums',
 'sub_forum',
 'forum_threads',
 'Auth',
 function($scope, sub_forums, sub_forum, forum_threads, Auth){
   
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