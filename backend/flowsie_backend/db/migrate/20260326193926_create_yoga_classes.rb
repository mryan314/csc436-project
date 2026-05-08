class CreateYogaClasses < ActiveRecord::Migration[8.1]
  def change
    create_table :yoga_classes do |t|
      t.string :name
      t.date :date
      t.time :start_time
      t.integer :duration
      t.integer :instructor_id
      t.string :desc
      t.integer :class_cap
      t.integer :class_size, default: 0
      t.string :location

      t.timestamps
    end
  end
end
