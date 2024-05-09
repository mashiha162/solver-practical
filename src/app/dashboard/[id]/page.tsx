"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const param = useParams();
  console.log(param.id);

  return <div>page</div>;
}
