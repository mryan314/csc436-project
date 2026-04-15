class AddDetailsToPoses < ActiveRecord::Migration[8.1]
  def change
    rename_column :poses, :image, :image_file
    add_column :poses, :difficulty, :string, limit: 12
    add_column :poses, :position, :string, limit: 12
    add_column :poses, :bend, :string, limit: 12
    add_column :poses, :var_id, :integer
    # limit difficulty/position/bend to select values
    add_check_constraint :poses, "difficulty IN ('Beginner', 'Intermediate', 'Advanced')", name: 'poses_difficulty_check'
    add_check_constraint :poses, "position IN ('Standing', 'Seated', 'Supported', 'Supine', 'Prone', 'Arm Balance')", name: 'poses_position_check'
    add_check_constraint :poses, "bend IN ('Back Bend', 'Forward Bend', 'Lateral Bend', 'Twist', 'Balance', 'Neutral')", name: 'poses_bend_check'
    # add var_id as index
    add_index :poses, :var_id
  end
end
