import AuthForm from "@/components/AuthForm";
import React from "react";

const page = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg3.png')",
      }}
    >
      <AuthForm type="sign-in" />
    </div>
  );
};

export default page;
