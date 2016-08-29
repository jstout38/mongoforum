class ForumThread
  include Mongoid::Document
  include Mongoid::Timestamps

  field :subject, type: String
  field :last_post_time, type: DateTime
  field :last_post_user, type: String
  field :last_post_id, type: String
  field :number_of_posts, type: Integer

  has_many :posts
  belongs_to :sub_forum, foreign_key: "sub_forum_id"
  belongs_to :user, foreign_key: "user_id"
  
  
  def as_json(options = {})
    res = super(options.merge(include: :posts))
    res["user"] = User.find(res["user_id"]).as_json
    

    res["_id"] = res["_id"].to_s
    res["sub_forum_id"] = res["sub_forum_id"].to_s
    res["created_at"] = res["created_at"].strftime("%I:%M%p on %m/%d/%Y")
    if res["last_post_time"]
      res["last_post_time"] = res["last_post_time"].strftime("%I:%M%p on %m/%d/%Y")
    end
    res["sub_forum_name"] = SubForum.find(res["sub_forum_id"]).name
    #res["last_post"] = res["last_post"].as_json
    #res["last_post"] = res["last_post"].as_json
    #last_post = Post.where(forum_thread_id: res["_id"]).order_by(:created_at => :desc).first.as_json
    #res["last_post"] = last_post

    #res["last_post_at"] = last_post["created_at"]


    #user = User.find(res["posts"][-1].user._id)
    #posts = res["posts"]
    #last_post = posts.last
    
    #res["last_post_at"] = last_post["created_at"]
    #last_post_user = User.find(last_post["user_id"]).as_json
    #res["last_post_user"] = last_post_user
    #res["last_post_user"] = user.username
    #res["last_post_user"] = res["posts"][-1][:user][:username]

    res
  end

  def add_last_post(post)
    post = Post.find(post)
    self.last_post_time = post.created_at
    self.last_post_user = post.user.username
    self.last_post_id = post.user._id
  end

  
  
end
