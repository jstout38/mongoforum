class ForumThread
  include Mongoid::Document
  include Mongoid::Timestamps

  field :subject, type: String

  has_many :posts, foreign_key: "post._id", order: :"post.created_at"
  belongs_to :sub_forum, foreign_key: "_id"
  belongs_to :user, foreign_key: "_id"
  
end
