class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :yoga_class, counter_cache: :class_size

  validates :user_id, uniqueness: { scope: :yoga_class_id }
  validate :yoga_class_not_full

  private

  def yoga_class_not_full
    errors.add(:base, "Class is full") if yoga_class&.full?
  end
end
