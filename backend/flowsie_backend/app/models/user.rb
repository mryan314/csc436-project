class User < ApplicationRecord
  has_many :api_keys, as: :bearer
  has_secure_password
  has_many :flow_lists, dependent: :destroy
  has_many :taught_classes, class_name: "YogaClass", foreign_key: :instructor_id, dependent: :destroy
  has_many :enrollments, dependent: :destroy
  has_many :enrolled_courses, through: :enrollments, source: :yoga_class

  enum :role, { student: 0, teacher: 1, admin: 2 }

  def admin?
    self.role == "admin"
  end

  def teacher?
    self.role == "teacher"
  end

  def ==(other)
    self.class == other.class &&
    self.id == other.id
  end
end