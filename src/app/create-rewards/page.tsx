"use client";
import Link from "next/link";
import {  useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { User } from "../lib/constant";

export default function CreateReward() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userName = searchParams.get("name");

  const [name, setName] = useState(userName ? userName : "");

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentUserId = id;


  const [reward, setReward] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Send a POST request to the API endpoint
      const dateTime = Date.now();
      const givenBy = id;
      const givenTo = name;
      const response = await fetch("/api/create-reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateTime, reward, givenBy, givenTo }),
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Failed to create reward");
      }
      // router.push("/");
      alert("Sucess");
      setName("");
    } catch (error) {
      console.error("Error creating reward:", error);
      alert("Something went wrong");
    }
  };

  const handleChange = (e: any) => {
    console.log("ee",e.target.value);
    
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

  const filteredUsers = users.filter((user) => user._id !== currentUserId);

  return (
    <div className="center">
      <h1>Create New Reward</h1>
      <form onSubmit={handleSubmit} className="mt-20">
        <label>
          Select User:
          <select value={name} onChange={handleChange}>
            {filteredUsers.map((user) => (
              <option key={user._id} value={user._id}>
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
