"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User, p5Reward } from "../lib/constant";

export default function page() {
  const searchParams = useSearchParams();

  const p5Balance = searchParams.get("p5Balance");
  const rewardBalance = searchParams.get("rewardBalance");
  const showRewardData = searchParams.get("showRewardData");

  const id = searchParams.get("id");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      const bodyData = showRewardData ? { id: id, isReward: true } : id;
      setLoading(true);
      const response = await fetch("/api/get-p5-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bodyData }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: any = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="center">
      <h1>{showRewardData ? "Reward " : "P5 "}Balance</h1>

      <h2>{showRewardData ? rewardBalance : p5Balance}</h2>

      <div className="heading mt-20">
        <h2></h2>
        <Link href={`/create-rewards?id=${id}`}>
          <button>Create New Reward</button>
        </Link>
      </div>
      <div className="users-page">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="mt-20" align="center">
            <thead>
              <tr>
                <th>#</th>
                <th>Date-Time</th>
                <th>{showRewardData ? "Reward Received" : "P5 given"}</th>
                <th>User Name</th>
                {showRewardData ? "" : <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(user.dateTime).toLocaleString()}</td>

                  <td>{user.p5Balance}</td>
                  <td>{user.rewardBalance}</td>
                  <td>Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
