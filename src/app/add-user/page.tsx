"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function AddEditUser() {
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const id = searchParams.get("id");
  const userName = searchParams.get("name");
  const p5Balance = searchParams.get("p5Balance");
  const rewardBalance = searchParams.get("rewardBalance");

  const [name, setName] = useState(userName ? userName : "");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (edit) {
        const response = await fetch("/api/update-user", {
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
        const p5Balance = 100;
        const rewardBalance = 0;
        // Send a POST request to the API endpoint
        const response = await fetch("/api/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, p5Balance, rewardBalance }),
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

  return (
    <div className="center">
      <h1>{edit ? "Edit" : "Create New"} User</h1>
      <form onSubmit={handleSubmit} className="mt-20">
        <label>
          Name:
          <input type="text" value={name} onChange={handleChange} required />
        </label>{" "}
        <br />
        <br />
        <button type="submit" className="theme-button">
          Save
        </button>{" "}
        &nbsp;
        <Link href="/">
          <button className="theme-button">Cancel</button>
        </Link>
      </form>

      {edit ? (
        <div className="mt-20">
          <Link href={`/p5-reward?id=${id}&p5Balance=${p5Balance}`}>
            <button className="theme-button"> View P5 Balance</button> &nbsp;
          </Link>

          <Link
            href={`/p5-reward?id=${id}&rewardBalance=${rewardBalance}&showRewardData=${true}`}
          >
            <button className="theme-button"> View Reward Balance</button>{" "}
            &nbsp;
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
