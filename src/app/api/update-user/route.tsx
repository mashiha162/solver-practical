import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body.id;
  const newName = body.name;
  const uri = process.env.MONGO_URL!;
  const client = new MongoClient(uri);

  async function run() {
    try {
      await client.connect();
      const database = client.db("solver_db");
      const userData = database.collection("user");

      const result = await userData.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { name: newName } }
      );

      console.log(`User with ID ${userId} updated with new name: ${newName}`);

      return NextResponse.json(result, { status: 200 });
    } finally {
      await client.close();
    }
  }

  return run().catch(console.dir);
}
