class UsersController < ApplicationController
    before_filter :authenticate_user!, only: [:update]

    def index
        #Find all users and paginate
        users = User.all.paginate(page: params[:page], per_page: 10)
        #Return the number of users as well
        userCount = User.all.count
        render json: {users: users, userCount: userCount}
    end

    def show
        #Respond with the user that has the passed ID
        respond_with User.find(params[:id])
    end

    def update
        #Update the current user with the params in the post hash
        @user = current_user.update(post_params)
        respond_with @user, location: nil
    end

    private
    def post_params
        #Sanitize params
        params.require(:user).permit(:id, :website, :facebook, :twitter, :linked_in, :location, :occupation, :interests, :birthday, :signature, :avatar)
    end
end
