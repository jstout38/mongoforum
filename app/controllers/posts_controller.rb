class PostsController < ApplicationController
	before_filter :authenticate_user!, only: [:create]

	def index
	  @thread = ForumThread.find(params[:forum_thread_id])
	  respond_with Post.where(forum_thread_id: @thread)
	  
	  #respond_with ForumThread.all
	  #_id = BSON::ObjectId.from_string(params[:sub_forum_id])
	  #respond_with ForumThread.where(:sub_forum_id => _id)
	end

	def show
	  respond_with Post.find(params[:id])
	end

	def create
	  @forum_thread = ForumThread.find(params[:forum_thread_id])
	  @post = @forum_thread.posts.build({body: params[:body], user: current_user})
	  @post.save
	  
	  respond_with @post, location: nil
	end

	#private
	#def post_params
	#  params.require(:post).permit(:title, :sub_forum_id)
	#end

end
