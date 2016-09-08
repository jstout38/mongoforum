class SubForum
  include Mongoid::Document

  #Class for subforums. Also stores information about the last post for easy access for Angular

  field :name, type: String
  field :last_post_time, type: DateTime
  field :last_post_user, type: String  
  field :last_post_id, type: String

  has_many :forum_threads

  def as_json(options = {})
    #Ensures that necessary information is available in the json
  	res = super(options.merge(include: :forum_threads))
    res["_id"] = res["_id"].to_s
    res["last_post_time"] = res["last_post_time"].strftime("%I:%M%p on %m/%d/%Y")
    res
  end

  def add_last_post(post)
    #Sets information about last post when a new post is created
    post = Post.find(post)
    self.last_post_time = post.created_at
    self.last_post_user = post.user.username
    self.last_post_id = post.user._id
  end

  
end
