class Pose < ApplicationRecord
  scope :in_variation_group, ->(id) { where(var_id: id) }
  has_many :flow_items, dependent: :destroy

  def variations
    return Pose.none if var_id.nil?
    Pose.where(var_id: var_id).select(:name, :id)
  end
end
