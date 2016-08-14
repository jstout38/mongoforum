class PrivateMessage
  include Mongoid::Document
  include Mongoid::Tiemstamps

  field :subject, type: String
  field :text, type: String

  belongs_to :user, foreign_key: "_id"
  has_one :recipient, class_name: "User"
end
