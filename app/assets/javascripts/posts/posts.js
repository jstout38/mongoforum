angular.module('stoutForum')
.factory('posts', [
  	'$http',
  function($http){
  	var o = { posts: [] };
  	o.getAll = function(sub_forum_id, id) {
      return $http.get('/sub_forums/' + sub_forum_id + '/forum_threads/' + id + '/posts.json').success(function(data){
        angular.copy(data, o.posts)
      })
    };
    //o.get = function(id, sub_forum) {
  	//  return $http.get('/forum_threads/' + id + '.json').then(function(res){
  	//  	return res.data;
  	//  })
  	//};
    o.create = function(body, forum_thread) {
      return $http.post('/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/posts.json', body).success(function(data){
        o.posts.push(data);
      });
    };
  	return o;
  }]);