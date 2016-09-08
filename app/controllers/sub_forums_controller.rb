class SubForumsController < ApplicationController

	def index
	  respond_with SubForum.all
	end

	def show
	  respond_with SubForum.find(params[:id])
	end

	private
	def post_params
	  params.require(:sub_forum)
	end
end
