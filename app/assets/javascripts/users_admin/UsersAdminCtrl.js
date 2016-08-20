angular.module('stoutForum')
.controller('UsersAdminCtrl', [
 '$scope',
 '$state',
 'users_admin',
 'Auth',
 function($scope, $state, users_admin, Auth){
   
   $scope.users_admin = users_admin.users_admin;
   $scope.update = function() {
 			users_admin.update($scope.user, Auth._currentUser).then(function(){
 				$state.go('home');
 			});
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