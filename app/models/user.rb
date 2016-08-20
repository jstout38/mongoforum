class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""
  field :username, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  
  field :website, type: String, default: ""
  field :facebook, type: String, default: ""
  field :twitter, type: String, default: ""
  field :pinterest, type: String, default: ""
  field :linked_in, type: String, default: ""
  field :location, type: String, default: ""
  field :occupation, type: String, default: ""
  field :interests, type: String, default: ""
  field :birthday, type: Date
  field :signature, type: String, default: ""
  field :avatar, type: String, default: ""

  embedded_in :post

  def as_json(options = {})
    res = super

    res["_id"] = res["_id"].to_s
    
    res
  end
  
end
