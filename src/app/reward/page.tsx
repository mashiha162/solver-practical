"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../lib/constant";

export default function page() {
  const searchParams = useSearchParams();

  const p5Balance = searchParams.get("p5Balance");
  const id = searchParams.get("id");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getp5-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }); 
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data: User[] = await response.json();
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
      <h1>P5 Balance</h1>

      <h2>{p5Balance}</h2>

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
                <th>P5 given</th>
                <th>User Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.p5Balance}</td>
                  <td>{user.rewardBalance}</td>
                  <td>
                    <Link
                      href={`/add-user/?id=${user._id}&name=${
                        user.name
                      }&edit=${true}&p5Balance=${user.p5Balance}`}
                    >
                      Login
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
