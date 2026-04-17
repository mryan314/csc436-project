class CreateFlowLists < ActiveRecord::Migration[8.1]
  def change
    create_table :flow_lists do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :flow_lists, [ :name, :user_id ], unique: true
  end
end
