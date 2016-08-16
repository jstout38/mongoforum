class ForumThreadsController < ApplicationController

	def index
	  @sub_forum = SubForum.find(params[:sub_forum_id])
	  respond_with ForumThread.where(sub_forum_id: @sub_forum)
	  
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
	  @forum_thread.save
	  
	  respond_with @forum_thread, location: nil
	end

	#private
	#def post_params
	#  params.require(:post).permit(:title, :sub_forum_id)
	#end
end
