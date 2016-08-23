class ForumThread
  include Mongoid::Document
  include Mongoid::Timestamps

  field :subject, type: String

  has_many :posts
  belongs_to :sub_forum, foreign_key: "sub_forum_id"
  belongs_to :user, foreign_key: "user_id"
  
  def as_json(options = {})
    res = super(options.merge(include: :user))
    

    res["_id"] = res["_id"].to_s
    res["sub_forum_id"] = res["sub_forum_id"].to_s

    res
  end
  
end
