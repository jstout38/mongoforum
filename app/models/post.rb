class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String
  field :upvotes, type: Integer, default: 0
  field :downvotes, type: Integer, default: 0

  embeds_one :user#, foreign_key: "user_id"
  belongs_to :forum_thread, foreign_key: "forum_thread_id" 

  def as_json(options = {})
  	res = super

  	res["_id"] = res["_id"].to_s
    res["sub_forum_id"] = res["sub_forum_id"].to_s
    res["created_at"] = res["created_at"].strftime("Posted on %m/%d/%Y at %I:%M%p ")
  	res
  end
  
end
