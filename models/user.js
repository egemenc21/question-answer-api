const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto") //in node js
const Schema = mongoose.Schema;
const Question = require("./question")
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"], //they should sign in name definitely
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    default: "user", // when admin has logged in it will change to admin
    enum: ["user", "admin"], // role choices
  },
  password: {
    type: String,
    minlength: [6, "Please provide a password with at least length of 6"],
    required: [true, "Please provide a password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});
// UserSchema .methods adds method to the Schema
UserSchema.methods.getResetPasswordTokenFromUser = function(){
  const randomHexString = crypto.randomBytes(15).toString("hex");
  const {RESET_PASSWORD_EXPIRE} = process.env

  const resetPasswordToken = crypto
  .createHash("SHA256")
  .update(randomHexString)
  .digest("hex")

  this.resetPasswordToken = resetPasswordToken;
  this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

  return resetPasswordToken;
  

}
UserSchema.methods.generateJwtFromUser = function () {
  const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;

  const payload = {
    id: this._id,
    name: this.name,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

UserSchema.pre("save", function (next) {
  //When Updateing the User did not change his/her password, to prevent not using hash again
  //mongoose.isModified(data) if data is changed: returns true
  if (!this.isModified("password")) {
    next(); //escape the code below
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});
UserSchema.post('deleteOne',{ document: true },async function(){
  await Question.deleteMany({
    user:this._id
  })
})

module.exports = mongoose.model("User", UserSchema);
//users
