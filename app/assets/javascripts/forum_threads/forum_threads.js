angular.module('stoutForum')
.factory('forum_threads', [
  '$http',
  function($http){
  	var o = { forum_threads: [] };
  	o.getAll = function(sub_forum) {
      return $http.get('/sub_forums/' + sub_forum + '/forum_threads.json').success(function(data){
        angular.copy(data, o.forum_threads)
      })
    };
    o.get = function(id, sub_forum) {
  	  return $http.get('/sub_forums/' + sub_forum + '/forum_threads/' + id + '.json').then(function(res){
  	  	return res.data;
  	  })
  	};
    o.create = function(thread, sub_forum) {
      return $http.post('/sub_forums/' + sub_forum._id + '/forum_threads.json', thread).success(function(data){
        o.forum_threads.push(data);
      });
    };
  	return o;
  }]);