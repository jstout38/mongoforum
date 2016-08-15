class ForumThreadsController < ApplicationController

	def index
	  respond_with ForumThread.where(:sub_forum_id => params[:sub_forum_id])
	end

	def show
	  respond_with ForumThread.find(params[:id])
	end

	def create
	  @sub_forum = SubForum.find(params[:sub_forum_id])
	  @forum_thread = @sub_forum.forum_threads.build({subject: params[:title]})	  
	  respond_with @sub_forum, @forum_thread
	end

	#private
	#def post_params
	#  params.require(:forum_thread)
	#end
end
