module Api
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else
        Rails.logger.error("User creation failed: #{@user.errors.full_messages}")
        render json: { 
          success: false, 
          error: @user.errors.full_messages.join(", ")
        }, status: :bad_request
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end