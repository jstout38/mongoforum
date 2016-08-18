class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String
  field :upvotes, type: Integer, default: 0
  field :downvotes, type: Integer, default: 0

  embeds_one :user#, foreign_key: "user_id"
  belongs_to :forum_thread, foreign_key: "forum_thread_id" 
  
end
