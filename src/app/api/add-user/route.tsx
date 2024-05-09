import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request: NextRequest) {
  let body = await request.json();
  const uri = process.env.MONGO_URL!;
  const client = new MongoClient(uri);
  async function run() {
    try {
      await client.connect();
      const database = client.db("solver_db");
      const userData = database.collection("user");
      const users = await userData.insertOne(body); 
      return NextResponse.json(users, { status: 200 });
    } finally {
      await client.close();
    }
  }
  return run().catch(console.dir);
}
