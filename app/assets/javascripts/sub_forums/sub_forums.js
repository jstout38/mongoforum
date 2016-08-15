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
    o.get = function(id) {
      return $http.get('/sub_forums/' + id + '.json').then(function(res){
        return res.data
      });
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