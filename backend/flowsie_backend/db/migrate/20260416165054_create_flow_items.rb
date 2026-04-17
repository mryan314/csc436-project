class CreateFlowItems < ActiveRecord::Migration[8.1]
  def change
    create_table :flow_items do |t|
      t.belongs_to :flow_list, null: false, foreign_key: true
      t.belongs_to :pose, null: false, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
