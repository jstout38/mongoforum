class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String
  field :upvotes, type: Integer, default: 0
  field :voters, type: Array, default: []
  field :downvotes, type: Integer, default: 0

  belongs_to :user, foreign_key: "user_id"
  belongs_to :forum_thread, foreign_key: "forum_thread_id"     

  def addUser(user)
    self.user = user
  end

  def as_json(options = {})
  	#res = super

  	#res["_id"] = res["_id"].to_s
    #res["sub_forum_id"] = res["sub_forum_id"].to_s
    #res["created_at"] = res["created_at"].strftime("Posted on %m/%d/%Y at %I:%M%p ")
    #user = User.find(res["user_id"])
    #res["user"] = {}
    #res["user"]["username"] = user.username
    #res["user"]["website"] = user.website
    #res["user"]["facebook"] = user.facebook
    #res["user"]["twitter"] = user.twitter
    #res["user"]["pinterest"] = user.pinterest
    #res["user"]["linked_in"] = user.linked_in
    #res["user"]["location"] = user.location
    #res["user"]["occupation"] = user.occupation
    #res["user"]["interests"] = user.interests
    #res["user"]["birthday"] = user.birthday
    #res["user"]["signature"] = user.signature
    #res["user"]["avatar"] = user.avatar
  	#res

    res = super(options.merge(include: :user))
    

    res["_id"] = res["_id"].to_s
    res["sub_forum_id"] = res["sub_forum_id"].to_s
    res["created_at"] = res["created_at"].strftime("%I:%M%p on %m/%d/%Y")

    res
  end
  
end
