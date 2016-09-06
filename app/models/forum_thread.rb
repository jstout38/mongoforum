class ForumThread
  include Mongoid::Document
  include Mongoid::Timestamps

  #Class for forum threads. Also stores information about the last post for easy access for Angular

  field :subject, type: String
  field :last_post_time, type: DateTime
  field :last_post_user, type: String
  field :last_post_id, type: String  

  has_many :posts
  belongs_to :sub_forum, foreign_key: "sub_forum_id"
  belongs_to :user, foreign_key: "user_id"
  
  
  def as_json(options = {})
    #Ensures that necessary information is available in the json
    res = super(options.merge(include: :posts))
    res["user"] = User.find(res["user_id"]).as_json
    res["_id"] = res["_id"].to_s
    res["sub_forum_id"] = res["sub_forum_id"].to_s
    res["created_at"] = res["created_at"].strftime("%I:%M%p on %m/%d/%Y")    
    res["last_post_time"] = res["last_post_time"].strftime("%I:%M%p on %m/%d/%Y")
    res["sub_forum_name"] = SubForum.find(res["sub_forum_id"]).name
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
