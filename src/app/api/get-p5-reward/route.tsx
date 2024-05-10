import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  let body = await request.json();
  const uri = process.env.MONGO_URL!;
  const client = new MongoClient(uri);
  const id = body?.bodyData;
  const fetchReward = body?.bodyData?.isReward;
  async function run() {
    try {
      await client.connect();
      const database = client.db("solver_db");
      if (fetchReward) {
        const userData = database.collection("rewardHistory");
        const users = await userData.find({}).toArray();
        console.log(users);
        return NextResponse.json(users, { status: 200 });
      } else {
        const userData = database.collection("p5History");
        const users = await userData.find().toArray();
        console.log(users);
        return NextResponse.json(users, { status: 200 });
      }
    } finally {
      await client.close();
    }
  }
  return run().catch(console.dir);
}
