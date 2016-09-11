class ForumThreadsController < ApplicationController
    before_filter :authenticate_user!, only: [:create]

    def index
        #Set current SubForum to the id provided by the URI
        sub_forum = SubForum.find(params[:id])
        #Find the forum threads in the current SubForum, paginate, and sort by last post time descending
        respond_with ForumThread.where(sub_forum_id: sub_forum._id).order_by(:"last_post_time" => "desc").paginate(page: params[:page], per_page: 10)
    end

    def show      
        #Respond with the forum thread with the id provided by the URI
        respond_with ForumThread.find(params[:id])
    end

    def create      
      #Set current SubForum to the id provided by the URI
      sub_forum = SubForum.find(params[:sub_forum_id])
      #Build a new ForumThread that belongs to the SubForum using the post hash, attribute it to the current user, and save
      forum_thread = sub_forum.forum_threads.build({subject: params[:title]})
      forum_thread.user = current_user
      forum_thread.save
      #Create the first post of the thread using the post hash, find the current page number, attribute it to the current user, and save
      post = forum_thread.posts.create({body: params[:post]})
      page_number = (forum_thread.posts.length - 1) / 10 + 1
      post.addUser(current_user, page_number)
      post.save
      #Add the post to the curent ForumThread and SubForum and save
      forum_thread.add_last_post(post)
      sub_forum.add_last_post(post)
      forum_thread.save
      sub_forum.save
      #Update the current users post count and save
      current_user_object = User.find(current_user)
      current_user.postCount = current_user_object.postCount + 1
      current_user.save
      #Respond with the created forum thread
      respond_with forum_thread, location: nil
    end
   
end
