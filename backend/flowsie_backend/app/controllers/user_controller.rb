class UserController < ApplicationController
  include ApiKeyAuthenticatable

  prepend_before_action :authenticate_with_api_key!, only: [:show, :destroy]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    if current_bearer.id.to_s==params[:id] || current_bearer.admin?
      user = User.find_by id: params[:id]
      render json: user and return
    end
    render status: :unauthorized
  end

  def destroy
    if current_bearer.admin?  # || current_bearer.id==params[:id]
      user = User.find_by id: params[:id]
      user.destroy
    else
      render status: :unauthorized
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :role)
  end
end
