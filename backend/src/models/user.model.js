const  mongoose  = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema =  new mongoose.Schema({
  Username: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }]
},
  {
    timestamps: true,
  });


userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('Password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(user.Password, 10);
    user.Password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;
