angular.module('stoutForum')
.controller('UsersAdminCtrl', [
 '$scope',
 '$state',
 'users_admin', 
 'Auth',
 'user',
 '$stateParams',
 function($scope, $state, users_admin, Auth, user, $stateParams){   
   $scope.user = user.data;
   $scope.user.birthday = new Date($scope.user.birthday);          
   $scope.users_admin = users_admin.users_admin;
   $scope.current_page = $stateParams.page;   
   $scope.total_users = users_admin.userCount;
   $scope.hasAvatar = function() {
         if ($scope.user.avatar != null && $scope.user.avatar != "") {
            return true;
         }
         return false;
      };   
   $scope.update = function() {
 			users_admin.update($scope.user, Auth._currentUser).then(function(){
 				$state.go('home');
 			});
 		};
   $scope.pagesArray = function(total_users){
      var pages = [];
      var pageCount = Math.floor((total_users - 1) / 10 ) + 1;
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