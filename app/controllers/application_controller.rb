class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token

  respond_to :json

  before_action :configure_permitted_parameters, if: :devise_controller?

  def angular
      render 'layouts/application'
  end

  private
  def configure_permitted_parameters
  	  devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :username, :website, :facebook, :twitter, :pinterest, :linked_in, :location, :occupation, :interests, :birthday, :signature, :avatar) }
      devise_parameter_sanitizer.for(:sign_in) << :username
  end

end
