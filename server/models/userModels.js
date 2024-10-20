const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    refreshToken: { type: String },
    role: { type: Number, default: 2 }, // 1 for Admin, 2 for User
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dateOfBirth: { type: Date },
    bio: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    profession: { type: String },
  },
  { timestamps: true }
);

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

///generate access token
userSchema.methods.GenerateAccessToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role,
    },
    process.env.Access_Token,
    { expiresIn: "24h" }
  );
};

///refresh access token
userSchema.methods.GenerateRefreshToken = async function () {
  return Jwt.sign(
    {
      _id: this._id,
      role: this.role,
    },
    process.env.Refresh_Token,
    { expiresIn: "30d" }
  );
};

//compare passport
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
