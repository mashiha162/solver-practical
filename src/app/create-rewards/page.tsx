"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../lib/constant";

export default function CreateReward() {
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const id = searchParams.get("id");
  const userName = searchParams.get("name");

  const [name, setName] = useState(userName ? userName : "");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUserId = "h";

  const [selectedUser, setSelectedUser] = useState("");

  const [reward, setReward] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (edit) {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name }),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        } else {
          alert("Edit Successfull");
        }
      } else {
        // Send a POST request to the API endpoint
        const response = await fetch("/api/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        // Check if the response is OK
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        router.push("/");
        setName("");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong");
    }
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

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

  const handleRewardChange = (e: any) => {
    const value = e.target.value;
    // Check if the value is empty or less than or equal to 100
    if (value === "" || (value >= 0 && value <= 100)) {
      setReward(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Reward value must be between 0 and 100.");
    }
  };

  return (
    <div className="center">
      <h1>{edit ? "Edit" : "Create New"} User</h1>
      <form onSubmit={handleSubmit} className="mt-20">
        <label>
          Select User:
          <select value={selectedUser} onChange={handleChange}>
            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
                disabled={user._id === currentUserId}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>{" "}
        <br />
        <br />
        <label>
          Reward (Max 100):
          <input
            type="number"
            value={reward}
            onChange={handleRewardChange}
            min="0"
            max="100"
            required
          />
        </label>{" "}
        <br />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
        <button type="submit" className="theme-button">
          Save
        </button>{" "}
        &nbsp;
        <Link href="/">
          <button className="theme-button">Cancel</button>
        </Link>
      </form>
    </div>
  );
}
