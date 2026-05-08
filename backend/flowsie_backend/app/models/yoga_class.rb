class YogaClass < ApplicationRecord
  belongs_to :instructor, class_name: "User", foreign_key: :instructor_id
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user

  # validates :class_cap

  def class_size
    enrollments.count
  end

  def full?
    return false if class_cap.nil?
    class_size >= class_cap
  end
end
