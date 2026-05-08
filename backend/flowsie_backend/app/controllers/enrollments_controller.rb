class EnrollmentsController < ApplicationController
  include ApiKeyAuthenticatable

  prepend_before_action :authenticate_with_api_key!

  def create
    @yoga_class = YogaClass.find(params[:yoga_class_id])

    if @yoga_class.instructor_id == current_bearer.id
      render json: { error: "Instructors cannot enroll in their own course" }, status: :unprocessable_entity and return
    end

    @enrollment = @yoga_class.enrollments.build(user: current_bearer)

    if @enrollment.save
      render json: @enrollment, status: :created
    else
      render json: { errors: @enrollment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @enrollment = current_bearer.enrollments.find_by(yoga_class_id: params[:yoga_class_id])

    if @enrollment.nil?
      render json: { error: "Not enrolled" }, status: :not_found and return
    end

    @enrollment.destroy
    render json: { message: "Unenrolled" }, status: :ok
  end
end
