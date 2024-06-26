import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: NextRequest) {
  const uri = process.env.MONGO_URL!;
  const client = new MongoClient(uri);
  async function run() {
    try {
      await client.connect();
      const database = client.db("solver_db");
      const userData = database.collection("user");
      const users = await userData.find({}).toArray(); 
      console.log(users); 
      return NextResponse.json(users, { status: 200 });
    } finally {
      await client.close();
    }
  }
  return run().catch(console.dir);
}
