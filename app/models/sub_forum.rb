class SubForum
  include Mongoid::Document

  field :name, type: String  

  has_many :forum_threads

  def as_json(options = {})
  	res = super

  	res["_id"] = res["_id"].to_s
  	
  	res
  end
  
end
