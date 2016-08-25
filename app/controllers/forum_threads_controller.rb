class ForumThreadsController < ApplicationController
	before_filter :authenticate_user!, only: [:create]

	def index
	  @sub_forum = SubForum.find(params[:sub_forum_id])
	  respond_with ForumThread.where(sub_forum_id: @sub_forum).order_by(:"last_post_time" => "desc")
	  
	  #respond_with ForumThread.all
	  #_id = BSON::ObjectId.from_string(params[:sub_forum_id])
	  #respond_with ForumThread.where(:sub_forum_id => _id)
	end

	def show
	  respond_with ForumThread.find(params[:id])
	end

	def create
	  
	  @sub_forum = SubForum.find(params[:sub_forum_id])
	  @forum_thread = @sub_forum.forum_threads.build({subject: params[:title]})
	  @forum_thread.user = current_user
	  @forum_thread.save
	  @post = @forum_thread.posts.create({body: params[:post]})
	  @post.addUser(current_user)
	  @post.save	  
	  @forum_thread.add_last_post(@post)
	  @sub_forum.add_last_post(@post)
	  @forum_thread.save
	  @sub_forum.save 
	  

	  respond_with @forum_thread, location: nil
	end

	#private
	#def post_params
	#  params.require(:post).permit(:title, :sub_forum_id)
	#end
end
