angular.module('stoutForum')
.controller('SubForumCtrl', [
 '$scope',
 'sub_forums',
 'sub_forum',
 'forum_threads',
 function($scope, sub_forums, sub_forum, forum_threads){
   
   $scope.sub_forum = sub_forum;
   $scope.sub_forum_id = sub_forum._id;
   $scope.addThread = function(){
      if(!$scope.title || $scope.title === '') {return;}
      forum_threads.create({
         title: $scope.title         
      }, $scope.sub_forum_id);
      $scope.title = '';
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