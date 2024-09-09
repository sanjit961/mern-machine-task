const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true, 
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    course: {
      type: [String],
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
