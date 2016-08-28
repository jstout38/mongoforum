angular.module('stoutForum')
.factory('users_admin', [
  '$http',
  function($http){
  	var o = { users_admin: [] };
  	o.getAll = function() {
  	  return $http.get('/users_admin.json').success(function(data){
  	  	angular.copy(data, o.users_admin)
  	  });
  	};
    o.update = function(body, user) {
      return $http.put('/users_admin/' + user._id + '.json', body).success(function(data){
        
      });
    };
    o.get = function(user) {
      return $http.get('/users_admin/' + user + '.json').success(function(data){        
        return data;
      });
    }    
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