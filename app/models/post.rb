class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  #Class for posts. Also stores information about the creator and thread page for easy access for Angular

  field :body, type: String
  field :upvotes, type: Integer, default: 0
  field :voters, type: Array, default: []
  field :downvotes, type: Integer, default: 0
  field :creator_name, type: String
  field :thread_page, type: Integer

  belongs_to :user, foreign_key: "user_id"
  belongs_to :forum_thread, foreign_key: "forum_thread_id"     

  def as_json(options = {})
    #Ensures that necessary information is available in the json
  	res = super(options.merge(include: :user))
    res["_id"] = res["_id"].to_s
    res["forum_thread_id"] = res["forum_thread_id"].to_s    
    res["created_at"] = res["created_at"].strftime("%I:%M%p on %m/%d/%Y")
    res["user_id"] = res["user_id"].to_s    
    current_forum_thread = ForumThread.find(res["forum_thread_id"])
    res["sub_forum_id"] = current_forum_thread.sub_forum_id.to_s
    res["forum_thread_topic"] = current_forum_thread.subject
    res
  end

  def addUser(user, page_number)
    #Sets information about the thread creator and the current page when a new post is created
    self.user = user
    self.creator_name = user.username
    self.thread_page = page_number
  end
  
end
