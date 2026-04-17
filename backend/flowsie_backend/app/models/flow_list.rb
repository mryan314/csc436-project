class FlowList < ApplicationRecord
  belongs_to :user
  has_many :flow_items, -> { order(:position) }, dependent: :destroy
  has_many :poses, through: :flow_items
  # has_many :users <- eventually want to allow teachers to share/publicize flows
  accepts_nested_attributes_for :flow_items, allow_destroy: true
end
