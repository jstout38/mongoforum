angular.module('stoutForum')
.factory('sub_forums', [
  '$http',
  function($http){
  	var o = { sub_forums: [] };
  	o.getAll = function() {
  	  return $http.get('/sub_forums.json').success(function(data){
  	  	angular.copy(data, o.sub_forums)
  	  })
  	};
  	return o;
  }]);