class UsersController < ApplicationController
	before_filter :authenticate_user!, only: [:update]

	def index
	  users = User.all.paginate(page: params[:page], per_page: 10)
	  userCount = User.all.count
	  render json: {users: users, userCount: userCount}
	end

	def show
	  respond_with User.find(params[:id])
	end

	def update
	  #@user = User.find(post_params[:user_id])
	  @user = current_user.update(post_params)
	  respond_with @user, location: nil
	end

	private
	def post_params
	  params.require(:user).permit(:id, :website, :facebook, :twitter, :linked_in, :location, :occupation, :interests, :birthday, :signature, :avatar)
	end
end
