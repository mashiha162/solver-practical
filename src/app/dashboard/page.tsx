"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  p5Balance: number;
  rewardBalance: number;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users");
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
    <>
      <div className="users-page">
        <div className="heading mt-20">
          <h2>Users</h2>
          <Link href={"/add-user"}>
            <button>Add New User</button>
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="mt-20" align="center">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>P5 balance</th>
                <th>Reward balance</th>
                <th>Action</th>
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
                      }&edit=${true}`}
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
    </>
  );
}
