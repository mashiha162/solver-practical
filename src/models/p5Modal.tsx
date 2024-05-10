import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const p5Schema = new mongoose.Schema({
  dateTime: {
    type: Date,
  },
  pointsGiven: {
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

const P5 = mongoose.models.users || mongoose.model("p5History", p5Schema);

export default P5;
