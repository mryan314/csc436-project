class YogaClassesController < ApplicationController
  include ApiKeyAuthenticatable

  prepend_before_action :authenticate_with_api_key!
  before_action :set_yoga_class, only: %i[ show update destroy ]

  def index
    @yoga_classes = YogaClass.includes(:instructor, :students)
    render json: @yoga_classes, include: { instructor: { only: :first_name } }
  end

  def create
    unless current_bearer.teacher?
      render json: { error: "Not authorized" }, status: :forbidden and return
    end

    @yoga_class = current_bearer.taught_classes.build(yoga_class_params)

    if @yoga_class.save
      render json: @yoga_class, status: :created
    else
      render json @yoga_class.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    render json: @yoga_class.as_json(yoga_class_includes)
  end

  def update
    unless current_bearer.admin? || current_bearer.id == @yoga_class.instructor_id
      render json: { error: "Not authorized" }, status: :forbidden and return
    end
    if @yoga_class.update(yoga_class_params)
      render json: @yoga_class, status: :created
    else
      render json: @yoga_class.errors, status: :unprocessable_entity
    end
  end

  def destroy
    unless current_bearer.admin? || current_bearer.id == @yoga_class.instructor_id
      render json: { error: "Not authorized" }, status: :forbidden and return
    end
    @yoga_class.destroy
  end

  private

  def yoga_class_params
    params.expect(yoga_class: [ :name, :desc, :scheduled_at, :duration, :location, :class_cap ])
  end

  def set_yoga_class
    @yoga_class = YogaClass.includes(:instructor, :class_size).find_by id: params[:id]
  end

  def yoga_class_includes
    options = {
      except: [ :created_at, :updated_at ],
      methods: :class_size,
      inlcude: { instructor: { only: :first_name } }
    }
    if current_bearer.admin? || current_bearer.id == @yoga_class.instructor_id
      options[:include][:students] = { only: [ :id, :first_name, :email ] }
    end
    options
  end
end
