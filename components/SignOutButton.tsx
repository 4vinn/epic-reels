"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <>
      <Button onClick={handleSignOut} className="btn-primary ">
        Sign Out
      </Button>
    </>
  );
};

export default SignOutButton;
