# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

poses = [
  { id: 1,	name: "Bridge", image_file: "BridgePose.png", difficulty: "Intermediate",	position: "Supine",	bend: "Back Bend" },
  { id: 2,	name: "Butterfly", image_file: "ButterflyPose.png", difficulty: "Beginner",	position: "Seated",	bend: "Neutral" },
  { id: 3,	name: "Cat", image_file: "CatPose.png", difficulty: "Beginner",	position: "Supported",	bend: "Forward Bend" },
  { id: 4,	name: "Chair", image_file: "ChairPose.png", difficulty: "Beginner",	position: "Standing",	bend: "Balance", var_id: 1 }, 
  { id: 5,	name: "Child's", image_file: "ChildsPose.png", difficulty: "Beginner",	position: "Prone",	bend: "Forward Bend", var_id: 2 },
  { id: 6,	name: "Cobra", image_file: "CobraPose.png", difficulty: "Intermediate",	position: "Prone",	bend: "Back Bend"},
  { id: 7,	name: "Corpse", image_file: "CorpsePose.png", difficulty: "Beginner",	position: "Supine",	bend: "Neutral" },
  { id: 8,	name: "Cow", image_file: "CowPose.png", difficulty: "Beginner",	position: "Supported",	bend: "Back Bend" },
  { id: 9,	name: "Crescent Lunge on Knee", image_file: "CrescentLungeKneePose.png",	difficulty: "Beginner",	position: "Standing",	bend: "Neutral" },
  { id: 10,	name: "Crow", image_file: "CrowPose.png", difficulty: "Intermediate",	position: "Arm Balance",	bend: "Balance" }, 
  { id: 11,	name: "Lord of the Dance", image_file: "DancersPose.png", difficulty: "Advanced",	position: "Standing",	bend: "Balance" },
  { id: 12,	name: "Downward Dog", image_file: "DownwardDogPose.png",	difficulty: "Beginner",	position: "Supported",	bend: "Forward Bend", var_id: 3 },
  { id: 13,	name: "Three-legged Downward Dog", image_file: "DownwardDogThreeLeggedPose.png",		difficulty: "Intermediate",	position: "Supported",	bend: "Balance", var_id: 3 },
  { id: 14,	name: "Extended Child's", image_file: "ExtendedChildsPose.png", difficulty: "Beginner",	position: "Prone",	bend: "Forward Bend", var_id: 2 },
  { id: 15,	name: "Extended Puppy", image_file: "ExtendedPuppyPose.png",	difficulty: "Intermediate",	position: "Prone",	bend: "Back Bend" },
  { id: 16,	name: "Extended Side Angle", image_file: "ExtendedSideAngle.png", difficulty: "Intermediate",	position: "Standing",	bend: "Lateral Bend", var_id: 10 },
  { id: 17,	name: "Forearm Balance", image_file: "ForearmBalancePose.png",	difficulty: "Advanced",	position: "Arm Balance",	bend: "Balance", var_id: 4 },
  { id: 18,	name: "Forearm Plank", image_file: "ForearmPlankPose.png",	difficulty: "Intermediate",	position: "Supported",	bend: "Balance", var_id: 9 },
  { id: 19,	name: "Half Moon", image_file: "HalfMoonPose.png",	difficulty: "Intermediate",	position: "Standing",	bend: "Balance" },
  { id: 20,	name: "Half Pigeon", image_file: "HalfPigeonPose.png",	difficulty: "Beginner",	position: "Seated",	bend: "Back Bend", var_id: 8 },
  { id: 21,	name: "Half Splits", image_file: "HalfSplitsPose.png",	difficulty: "Intermediate",	position: "Supported",	bend: "Forward Bend" },
  { id: 22,	name: "Half Standing Foreward Bend", image_file: "HalfStandingForwardBendPose.png",	difficulty: "Beginner",	position: "Standing",	bend: "Forward Bend", var_id: 11 },
  { id: 23,	name: "Handstand", image_file: "HandstandPose.png", difficulty: "Advanced",	position: "Arm Balance",	bend: "Balance", var_id: 5 },
  { id: 24,	name: "Handstand Splits", image_file: "HandstandSplitsPose.png",	difficulty: "Advanced",	position: "Arm Balance",	bend: "Balance", var_id: 5 },
  { id: 25,	name: "Inverted Staff", image_file: "InvertedStaffPose.png",	difficulty: "Advanced",	position: "Supported",	bend: "Balance", var_id: 6 },
  { id: 26,	name: "Locust I", image_file: "LocustPose.png", difficulty: "Intermediate",	position: "Supine",	bend: "Back Bend", var_id: 7 },
  { id: 27,	name: "Locust III", image_file: "LocustCPose.png",	difficulty: "Intermediate",	position: "Supine",	bend: "Back Bend", var_id: 7 },
  { id: 28,	name: "Lotus", image_file: "LotusPose.png", difficulty: "Intermediate",	position: "Seated",	bend: "Neutral" },
  { id: 29,	name: "Lunge on Knee", image_file: "LungeKneePose.png", difficulty: "Beginner",	position: "Supported",	bend: "Balance" },
  { id: 30,	name: "Mermaid", image_file: "MermaidPose.png", difficulty: "Intermediate",	position: "Seated",	bend: "Back Bend", var_id: 8 },
  { id: 31,	name: "One-legged Inverted Staff", image_file: "OneLeggedInvertedStaffPose.png",		difficulty: "Advanced",	position: "Supported",	bend: "Back Bend", var_id: 6 },
  { id: 32, name: "One-legged King Pigeon", image_file: "OneLeggedKingPigeonPose.png",	difficulty: "Advanced",	position: "Seated",	bend: "Back Bend", var_id: 8 },
  { id: 33,	name: "Plank", image_file: "PlankPose.png", difficulty: "Intermediate",	position: "Supported",	bend: "Balance", var_id: 9 },
  { id: 34,	name: "Plow", image_file: "PlowPose.png",	difficulty: "Intermediate",	position: "Arm Balance",	bend: "Forward Bend" },
  { id: 35,	name: "Reclined Big Toe", image_file: "ReclinedBigToePose.png",	difficulty: "Intermediate",	position: "Supine",	bend: "Neutral" },
  { id: 36,	name: "Reclined Spinal Twist", image_file: "ReclinedSpinalTwistPose.png",difficulty: "Beginner",	position: "Supine",	bend: "Twist" },
  { id: 37,	name: "Revolved Chair", image_file: "RevolvedChairPose.png",		difficulty: "Beginner",	position: "Standing",	bend: "Twist", var_id: 1 },
  { id: 38,	name: "Revolved Side Angle", image_file: "RevolvedSideAnglePose.png",	difficulty: "Intermediate",	position: "Standing",	bend: "Twist", var_id: 10 },
  { id: 39,	name: "Scorpion Handstand", image_file: "ScorpionHandstandPose.png",		difficulty: "Advanced",	position: "Arm Balance",	bend: "Back Bend", var_id: 5 },
  { id: 40,	name: "Seated Camel", image_file: "SeatedCamelPose.png",	difficulty: "Intermediate",	position: "Seated",	bend: "Back Bend"  },
  { id: 41,	name: "Seated Forward Bend", image_file: "SeatedForwardBendPose.png",	difficulty: "Beginner",	position: "Seated",	bend: "Forward Bend" },
  { id: 42,	name: "Seated Spinal Twist", image_file: "SeatedSpinalTwistPose.png", difficulty: "Intermediate",	position: "Seated",	bend: "Twist" },
  { id: 43,	name: "Supported Shoulderstand", image_file: "SupportedShoulderStandPose.png",	difficulty: "Intermediate",	position: "Arm Balance",	bend: "Balance" },
  { id: 44,	name: "Side Forearm Plank", image_file: "SideForearmPlankPose.png",	difficulty: "Intermediate",	position: "Supported",	bend: "Balance" },
  { id: 45,	name: "Sphinx", image_file: "SphinxPose.png",		difficulty: "Beginner",	position: "Supine",	bend: "Back Bend" },
  { id: 46,	name: "Standing Foreward Bend", image_file: "StandingForwardBendPose.png",		difficulty: "Beginner",	position: "Standing",	bend: "Forward Bend", var_id: 11 },
  { id: 47,	name: "Standing Foreward Bend with Raised Arms", image_file: "StandingForwardBend2Pose.png", difficulty: "Intermediate",	position: "Standing",	bend: "Forward Bend", var_id: 11 },
  { id: 48,	name: "Supported Sage Visvamitras", image_file: "SupportedSageVisvamitrasPose.png",			difficulty: "Advanced",	position: "Supported",	bend: "Balance" },
  { id: 49,	name: "Tree", image_file: "TreePose.png",	difficulty: "Intermediate",	position: "Standing",	bend: "Balance" },
  { id: 50,	name: "Triangle", image_file: "TrianglePose.png",	difficulty: "Beginner",	position: "Standing",	bend: "Lateral Bend" },
  { id: 51,	name: "Upward Plank", image_file: "UpwardPlankPose.png",	difficulty: "Beginner",	position: "Supported",	bend: "Back Bend" },
  { id: 52,	name: "Warrior I", image_file: "WarriorAPose.png",	difficulty: "Beginner",	position: "Standing",	bend: "Balance", var_id: 12 },
  { id: 53,	name: "Warrior II", image_file: "WarriorBPose.png",	difficulty: "Beginner",	position: "Standing",	bend: "Balance", var_id: 12 },
  { id: 54,	name: "Warrior III", image_file: "WarriorCPose.png",	difficulty: "Advanced",	position: "Standing",	bend: "Balance", var_id: 12 },
  { id: 55,	name: "Wide-legged Bend I", image_file: "WideLeggedBend1Pose.png",	difficulty: "Intermediate",	position: "Standing",	bend: "Forward Bend", var_id: 13 },
  { id: 56,	name: "Wide-legged Bend III", image_file: "WideLeggedBend3Pose.png",	difficulty: "Intermediate",	position: "Standing",	bend: "Forward Bend", var_id: 13 },
  { id: 57,	name: "Wide Splits", image_file: "WideSplitsPose.png",	difficulty: "Advanced",	position: "Seated",	bend: "Balance" },
  { id: 58,	name: "Wind Removing", image_file: "WindRemovingPose.png", difficulty: "Beginner", position: "Supine", bend: "Forward Bend" }
]

poses.each do |attrs|
  Pose.find_or_create_by(name: attrs[:name]) do |p|
    p.assign_attributes(attrs.except(:name))
  end
end
