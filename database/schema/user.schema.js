const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: "string",
    required: [true, "Please enter a name"],
  },
  email: {
    type: "string",
    required: [true, "Please enter a email"],
    unique: [true, "Email is already in use"],
  },
  password: {
    type: "string",
    required: [true, "Please enter a password"],
  },
  confirmPassword: {
    type: "string",
    required: [true, "Please enter the confirm password"],
  },
  role: {
    type: "string",
    enum: ["user", "admin"],
    default: "user",
  },
  photo: {
    type: "string",
  },
});

module.exports = UserSchema;
