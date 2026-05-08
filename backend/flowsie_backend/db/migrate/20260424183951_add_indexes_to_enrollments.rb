class AddIndexesToEnrollments < ActiveRecord::Migration[8.1]
  def change
    remove_column :yoga_classes, :date
    remove_column :yoga_classes, :start_time
    add_column :yoga_classes, :scheduled_at, :datetime

    add_index :enrollments, [ :user_id, :yoga_class_id ], unique: true
    add_index :yoga_classes, :scheduled_at
  end
end
