angular.module('stoutForum')
.factory('users_admin', [
  '$http',
  function($http){
  	var o = { users_admin: [] };
  	o.getAll = function() {
  	  return $http.get('/users_admin.json').success(function(data){
  	  	angular.copy(data, o.users_admin)
  	  })
  	};    
  	return o;
  }])
/*.factory('sub_forum', [
  '$http',
  function($http){
    var o
    o.get = function(id) {
      return $http.get('/sub_forums/' + id + '.json').then(function(res){
        return res.data;
      });
    };
    return o;
  }]);*/