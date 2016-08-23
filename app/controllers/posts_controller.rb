class PostsController < ApplicationController
	before_action :set_post, only: [:show, :upvote, :downvote]
	before_filter :authenticate_user!, only: [:create]

	def index
	  @thread = ForumThread.find(params[:forum_thread_id])
	  respond_with Post.where(forum_thread_id: @thread)
	  
	  #respond_with ForumThread.all
	  #_id = BSON::ObjectId.from_string(params[:sub_forum_id])
	  #respond_with ForumThread.where(:sub_forum_id => _id)
	end

	def show
	  respond_with @post
	end

	def create
	  @forum_thread = ForumThread.find(params[:forum_thread_id])
	  @post = @forum_thread.posts.create(post_params)
	  @post.addUser(current_user)
	  @post.save
	  
	  respond_with @post, location: nil
	end

	def upvote
	  
	  changed = false
	  @user = current_user
	  if (!@post.voters.include? @user._id) && (@user._id != @post.user._id)
	  	@post.upvotes = @post.upvotes + 1
	  	@post.voters << @user._id
	  	@post.save
	  	changed = true
	  end

	  respond_to do |format| 
	  	if changed
	  		format.json { render json: @post, status: :ok, location: nil }
	  	else
	  		format.json { render json: @post, status: :no_content, location: nil}
	  	end
	  end

	end 

	def downvote
	  changed = false
	  @user = current_user
	  if (!@post.voters.include? @user._id) && (@user._id != @post.user._id)
	  	 @post.downvotes = @post.downvotes + 1
	  	 @post.voters << @user._id
	  	 @post.save
	  	 changed = true
	  end

	  respond_to do |format|
	  	if changed
	  		format.json { render json: @post, status: :ok, location: nil }
	  	else
	  		format.json { render json: @post, status: :no_content, location: nil }
	  	end
	  end
	end

	private

	def set_post
	  @post = Post.find(params[:id])
	end

	def post_params
	  params.require(:post).permit(:body, :forum_thread_id)
	end

end
