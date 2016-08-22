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
	  @post = @forum_thread.posts.create(post_params)
	  @post.addUser(current_user)
	  @post.save
	  
	  respond_with @post, location: nil
	end

	def upvote
	  @post = Post.find(params[:id])
	  if @post.voters.include? params[:id]
	  	@post.increment!(:upvotes)
	  	@post.voters = @post.voters + params[:id]
	  end

	  respond_with @post
	end

	def downvote
	  @post = Post.find(params[:id])
	  if @post.voters.include? params[:id]
	  	@post.increment!(:downvotes)
	  	@post.voters = @post.voters + params[:id]
	  end

	  respond_with @post
	end

	private
	def post_params
	  params.require(:post).permit(:body, :forum_thread_id)
	end

end
