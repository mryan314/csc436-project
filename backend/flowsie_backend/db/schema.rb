# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_24_183951) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "api_keys", force: :cascade do |t|
    t.integer "bearer_id", null: false
    t.string "bearer_type", null: false
    t.datetime "created_at", null: false
    t.string "token_digest", null: false
    t.datetime "updated_at", null: false
    t.index ["bearer_id", "bearer_type"], name: "index_api_keys_on_bearer_id_and_bearer_type"
    t.index ["token_digest"], name: "index_api_keys_on_token_digest", unique: true
  end

  create_table "enrollments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "yoga_class_id", null: false
    t.index ["user_id", "yoga_class_id"], name: "index_enrollments_on_user_id_and_yoga_class_id", unique: true
    t.index ["user_id"], name: "index_enrollments_on_user_id"
    t.index ["yoga_class_id"], name: "index_enrollments_on_yoga_class_id"
  end

  create_table "flow_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "flow_list_id", null: false
    t.bigint "pose_id", null: false
    t.integer "position"
    t.datetime "updated_at", null: false
    t.index ["flow_list_id"], name: "index_flow_items_on_flow_list_id"
    t.index ["pose_id"], name: "index_flow_items_on_pose_id"
  end

  create_table "flow_lists", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["name", "user_id"], name: "index_flow_lists_on_name_and_user_id", unique: true
    t.index ["user_id"], name: "index_flow_lists_on_user_id"
  end

  create_table "poses", force: :cascade do |t|
    t.string "bend", limit: 12
    t.datetime "created_at", null: false
    t.string "difficulty", limit: 12
    t.string "image_file"
    t.string "name"
    t.string "position", limit: 12
    t.datetime "updated_at", null: false
    t.integer "var_id"
    t.index ["name"], name: "index_poses_on_name", unique: true
    t.index ["var_id"], name: "index_poses_on_var_id"
    t.check_constraint "\"position\"::text = ANY (ARRAY['Standing'::character varying, 'Seated'::character varying, 'Supported'::character varying, 'Supine'::character varying, 'Prone'::character varying, 'Arm Balance'::character varying]::text[])", name: "poses_position_check"
    t.check_constraint "bend::text = ANY (ARRAY['Back Bend'::character varying, 'Forward Bend'::character varying, 'Lateral Bend'::character varying, 'Twist'::character varying, 'Balance'::character varying, 'Neutral'::character varying]::text[])", name: "poses_bend_check"
    t.check_constraint "difficulty::text = ANY (ARRAY['Beginner'::character varying, 'Intermediate'::character varying, 'Advanced'::character varying]::text[])", name: "poses_difficulty_check"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest", null: false
    t.integer "role", default: 0
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email_address", unique: true
  end

  create_table "yoga_classes", force: :cascade do |t|
    t.integer "class_cap"
    t.integer "class_size", default: 0
    t.datetime "created_at", null: false
    t.string "desc"
    t.integer "duration"
    t.bigint "instructor_id"
    t.string "location"
    t.string "name"
    t.datetime "scheduled_at"
    t.datetime "updated_at", null: false
    t.index ["instructor_id"], name: "index_yoga_classes_on_instructor_id"
    t.index ["scheduled_at"], name: "index_yoga_classes_on_scheduled_at"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "enrollments", "users"
  add_foreign_key "enrollments", "yoga_classes"
  add_foreign_key "flow_items", "flow_lists"
  add_foreign_key "flow_items", "poses"
  add_foreign_key "flow_lists", "users"
  add_foreign_key "yoga_classes", "users", column: "instructor_id"
end
