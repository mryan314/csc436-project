class User < ApplicationRecord
  has_many :api_keys, as: :bearer
  has_secure_password

  enum :role, {student: 0, teacher: 1, admin: 2}

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