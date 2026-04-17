class FlowListsController < ApplicationController
  include ApiKeyAuthenticatable

  prepend_before_action :authenticate_with_api_key!
  before_action :set_flow, only: %i[ update destroy ]

  def index
    @flow_lists = current_bearer.flow_lists
    render json: @flow_lists
  end

  def show
    # remove current_bearer to make publicly accessible
    @flow_list = current_bearer.flow_lists.find(params[:id])
    render json: @flow_list, include: :flow_items
  end

  def create
    @flow_list = current_bearer.flow_lists.build(flow_params)
    if @flow_list.save
      render json: @flow_list, status: :created
    else
      render json: { errors: @flow_list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @flow_list.update(flow_params)
      render json: @flow_list, include: :flow_items
    else
      render json: @flow_list.errors, status: :uprocessable_entity
    end
  end

  def destroy
    @flow_list.destroy
  end

  private

  def flow_params
    params.expect(flow: [ :name, flow_items_attributes: [[ :id, :pose_id, :position, :_destroy ]] ])
  end

  def set_flow
    @flow_list = current_bearer.flow_lists.find(params[:id])
  end
end
