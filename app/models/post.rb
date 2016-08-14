class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String
  field :upvotes, type: Integer, default: 0
  field :downvotes, type: Integer, default: 0

  belongs_to :user, foreign_key: "_id"
  belongs_to :forum_thread, foreign_key: "_id"
  belongs_to :sub_forum, foreign_key: "_id"
  
end
