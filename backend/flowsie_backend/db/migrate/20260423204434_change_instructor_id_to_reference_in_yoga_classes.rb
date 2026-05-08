class ChangeInstructorIdToReferenceInYogaClasses < ActiveRecord::Migration[8.1]
  def change
    remove_column :yoga_classes, :instructor_id
    add_reference :yoga_classes, :instructor, foreign_key: { to_table: :users }
  end
end
