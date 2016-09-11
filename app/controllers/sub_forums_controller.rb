class SubForumsController < ApplicationController

    def index
        #Find all SubForums and sort by created at time ascending
        respond_with SubForum.all.order_by(created_at: "asc")
    end

    def show
        #Respond with the SubForum with the id provided by the URI
        respond_with SubForum.find(params[:id])
    end
    
end
