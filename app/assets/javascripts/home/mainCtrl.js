angular.module('stoutForum')
.controller('MainCtrl', [
 '$scope',
 'sub_forums',
 function($scope, sub_forums){
   $scope.sub_forums = sub_forums.sub_forums;
   //$scope.number_of_threads = $scope.sub_forums["forum_threads"].count
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