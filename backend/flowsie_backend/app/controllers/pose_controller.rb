class PoseController < ApplicationController
  def index
    @poses = Pose.all
    render json: @poses, include: :variations
  end

  def show
    @pose = Pose.find_by id: params[:id]
  end

  def create
    @pose = Pose.new(pose_params)
    if @pose.save
      render json: @pose, status: :created
    else
      render json: @pose.errors, status: :unprocessable_entity
    end
  end

  def update
    @pose = Pose.find_by id: params[:id]

  end

  private

  def pose_params
    params.require(:pose).permit(:name, :difficulty, :position, :bend, :image_url, :variations)
  end
end
