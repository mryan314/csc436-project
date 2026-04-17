class FlowItem < ApplicationRecord
  belongs_to :flow_list
  belongs_to :pose

  validates :position, presence: true
end
