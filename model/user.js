const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password should be greater than 4"],
      select: false,
    },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//comparePassword

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
