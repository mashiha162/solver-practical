import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
  },
  points: {
    type: Number,
    default: 0,
  },
  givenBy: {
    type: ObjectId,
  },
  givenTo: {
    type: ObjectId,
  },
});

const Reward =
  mongoose.models.users || mongoose.model("rewardHistory", rewardSchema);

export default Reward;
