angular.module('stoutForum')
.factory('posts', [
  	'$http',
  function($http){
  	var o = { posts: [] };
  	o.getAll = function(sub_forum_id, id, page) {
      return $http.get('/sub_forums/' + sub_forum_id + '/forum_threads/' + id + '/posts/index/' + page + '.json').success(function(data){
        console.log(data);
        angular.copy(data, o.posts);
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
        var currentUser = o.posts[o.posts.length - 1].user.id;
        for (post of o.posts) {
          if (post.upvoteser.id == currentUser) {
            post.user.postCount++;
          }
        }
      });
    };
    o.upvote = function(forum_thread, post) {
      return $http.put('/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/posts/' + post._id + '/upvote.json')
        .then(function(data){
          if (data.status == 200) {
            post.upvotes += 1;
          }
        });
    };
    o.downvote = function(forum_thread, post) {
      return $http.put('/sub_forums/' + forum_thread.sub_forum_id + '/forum_threads/' + forum_thread._id + '/posts/' + post._id + '/downvote.json')
        .then(function(data){
          if (data.status == 200) {
            post.downvotes += 1;
          }
        });
    };
    o.search = function(search_hash) {
      return $http.get('/search/1/' + search_hash.post_search + '/' + search_hash.user_search).success(function(data){
        console.log(data);
        o.posts.push(data);
      });
    }
  	return o;
  }]);