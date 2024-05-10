
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  let body = await request.json();
  const uri = process.env.MONGO_URL!;
  const client = new MongoClient(uri);
  async function run() {
    try {
      await client.connect();
      const database = client.db("solver_db");
      const userData = database.collection("rewardHistory");
      const users = await userData.insertOne(body);

      // Update data
      const updateUser = database.collection("user");
      const rewardAmount = Number(body?.reward);

      // Deduct reward amount from p5Balance of the user giving the reward
      const deduct = await updateUser.updateOne(
        { _id: new ObjectId(body?.givenBy) },
        { $inc: { p5Balance: -rewardAmount } }
      );

      // Add reward amount to rewardBalance of the user receiving the reward
      const add = await updateUser.updateOne(
        { _id: new ObjectId(body?.givenTo) },
        { $inc: { rewardBalance: rewardAmount } }
      );

      const responseObj = {
        add,
        deduct,
        users,
      };

      return NextResponse.json(responseObj, { status: 200 });
    } catch (error) {
      console.error("An error occurred:", error);
      return NextResponse.error();
    } finally {
      await client.close();
    }
  }

  try {
    return await run();
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error();
  }
}
