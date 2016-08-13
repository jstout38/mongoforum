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
end
