class PostsController < ApplicationController
	before_action :set_post, only: [:show, :upvote, :downvote]
	before_filter :authenticate_user!, only: [:create]

	def index
	  @thread = ForumThread.find(params[:id])	 
	  respond_with Post.where(forum_thread_id: @thread._id).paginate(page: params[:page], per_page: 10)	
	  # => respond_with @posts.paginate(page: params[:page], per_page: 10)
	  
	  #respond_with ForumThread.all
	  #_id = BSON::ObjectId.from_string(params[:sub_forum_id])
	  #respond_with ForumThread.where(:sub_forum_id => _id)
	end

	def show
	  respond_with @post
	end

	def create
	  @forum_thread = ForumThread.find(params[:forum_thread_id])
	  @sub_forum = SubForum.find(@forum_thread.sub_forum_id)
	  @post = @forum_thread.posts.create(post_params)
	  @post.addUser(current_user)	  
	  @post.save	  
	  @forum_thread.add_last_post(@post)
	  @forum_thread.save
	  @sub_forum.add_last_post(@post)
	  @sub_forum.save
	  @current_user = User.find(current_user)
	  @current_user.postCount = @current_user.postCount + 1
	  @current_user.save

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

	def search		
		if (params[:post_search] != "undefined" && params[:user] != "undefined")
			@results = Post.where(body: /#{params[:post_search]}/i).where(creator_name: /#{params[:user]}/i).order_by(:created_at => "desc").paginate(page: params[:page], per_page: 10)
		elsif (params[:user] == "undefined")
			@results = Post.where(body: /#{params[:post_search]}/i).order_by(:created_at => "desc").paginate(page: params[:page], per_page: 10)
		elsif (params[:post_search] == "undefined")
			@results = Post.where(creator_name: /#{params[:user]}/i).order_by(:created_at => "desc").paginate(page: params[:page], per_page: 10)
		else
			@results = ""
		end
		render json: @results
	end

		private

	def set_post
	  @post = Post.find(params[:id])
	end

	def post_params
	  params.require(:post).permit(:body, :forum_thread_id)
	end

end
