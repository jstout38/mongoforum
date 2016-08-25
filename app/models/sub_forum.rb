class SubForum
  include Mongoid::Document

  field :name, type: String
  field :last_post_time, type: DateTime
  field :last_post_user, type: String  

  has_many :forum_threads

  def as_json(options = {})
  	res = super(options.merge(include: :forum_threads))
    

    res["_id"] = res["_id"].to_s
    if res["last_post_time"]
      res["last_post_time"] = res["last_post_time"].strftime("%I:%M%p on %m/%d/%Y")
    end
     

    res
  end

  def add_last_post(post)
    post = Post.find(post)
    self.last_post_time = post.created_at
    self.last_post_user = post.user.username
  end

  
end
