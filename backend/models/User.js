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
      unique: true, // Assuming mobile numbers should be unique
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Restricting to predefined values
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Assuming this will store a URL or a file path
      required: true, // Optional, in case the image is not mandatory
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
