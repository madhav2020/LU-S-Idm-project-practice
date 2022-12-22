const UserSchema = require("../schema/user.schema");
const { model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// just before saving whatever operation we want to perform we can do it using below pre method
UserSchema.pre("save", async function (next) {
  // the problem with pre save method is it execute every time we call save function therefore while updating the documents we have to call the save function and just to avoid the decryption for the update function we are using below if function
  if (!this.isModified("password")) return next();

  //   BCRYPT THE PASSWORD BEFORE SAVE
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// here whatever methods we will create it will have the access to the user data and every time we call this it will point to that user data and we can create multiple function here using methods.functionName and these function can be accessed where ever we call UserModel

// function methods to check if the password is correct or not
UserSchema.methods.correctPassword = async function (user_passwords) {
  console.log('checking password')
  return await bcrypt.compare(user_passwords, this.password);
};

// function method to generate user token
UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// Create Model and collection for the user
const UserModel = model("user", UserSchema);

module.exports = UserModel;
