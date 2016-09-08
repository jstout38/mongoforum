class PostsController < ApplicationController
	before_action :set_post, only: [:show, :upvote, :downvote]
	before_filter :authenticate_user!, only: [:create]

	def index
	  @thread = ForumThread.find(params[:id])	 
	  respond_with Post.where(forum_thread_id: @thread._id).order_by(created_at: "asc").paginate(page: params[:page], per_page: 10)	
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
	  page_number = (@forum_thread.posts.length - 1) / 10 + 1
	  @post.addUser(current_user, page_number)	  
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
		hasResults = false
		if params[:time] != "0"
			start_date = Date.today - params[:time].to_i
		else 
			start_date = Date.new(2000,1,1)			
		end
		@raw_results = Post.where(:"created_at" => {:$gte =>start_date } )
		if params[:keywords] != "undefined" && params[:keywords].length > 2
			keywords = params[:keywords].split(/\s(?=(?:[^"]|"[^"]*")*$)/)
			keywords.each do |keyword|
			  if keyword.length > 2
			  	@raw_results = @raw_results.where(body: /#{keyword}/i)
			  end
			end
			hasResults = true
		end
		if params[:user] != "undefined" && params[:user].length > 2
			@raw_results = @raw_results.where(creator_name: /#{params[:user]}/i)
			hasResults = true
		end
		if params[:topic] != "undefined" && params[:topic].length > 2
			@topics = ForumThread.where(subject: /#{params[:topic]}/i)
			@topic_ids = @topics.map {|topic| topic._id}			
			@raw_results = @raw_results.where(:forum_thread_id => {:$in => @topic_ids } )
			hasResults = true
		end
		@raw_results = @raw_results.order_by(:created_at => "desc")
		if @raw_results.count == 0 || !hasResults
			@results = []
			@forum_thread_results =[]
		else
		  @results = @raw_results.paginate(page: params[:post_page], per_page: 10)		  
		  @thread_ids = @raw_results.map {|post| post.forum_thread_id}.uniq		  
		  @forum_thread_results = ForumThread.where(:_id => {:$in  => @thread_ids } ).order_by(:last_post_time => "desc")
		  @forum_thread_count = @forum_thread_results.count
		  @forum_thread_results = @forum_thread_results.paginate(page: params[:thread_page], per_page: 10)
		end
		@full_results = {:posts => @results, :threads => @forum_thread_results, :post_count => @raw_results.count, :forum_thread_count => @forum_thread_count}
		render json: @full_results
	end

		private

	def set_post
	  @post = Post.find(params[:id])
	end

	def post_params
	  params.require(:post).permit(:body, :forum_thread_id)
	end

end
