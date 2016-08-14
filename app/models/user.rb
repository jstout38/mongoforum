class User
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :username, type: String
  field :email, type: String
  field :password, type: String
  field :website, type: String
  field :facebook, type: String
  field :twitter, type: String
  field :pinterest, type: String
  field :linked_in, type: String
  field :location, type: String
  field :occupation, type: String
  field :interests, type: String
  field :birthday, type: Date
  field :signature, type: String
  field :avatar, type: String

  has_many :posts, foreign_key: "post._id"
  has_many :private_messages, foreign_key: "private_message._id", order: :"private_message.created_at"
  has_many :ignored_users, class_name: "User", foreign_key: "user._id"
  has_many :friended_users, class_name: "User", foreign_key: "user._id"

end
