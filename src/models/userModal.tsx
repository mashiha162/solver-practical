import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  p5Balance: {
    type: Number,
    default: 100, 
  },
  rewardBalance: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
