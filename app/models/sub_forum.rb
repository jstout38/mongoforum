class SubForum
  include Mongoid::Document

  field :name, type: String

  has_many :forum_threads, foreign_key: "forum_thread._id"
  
end
