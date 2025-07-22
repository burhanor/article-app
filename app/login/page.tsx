import React from "react";
import LoginForm from "./components/loginform";

export default function LoginPage() {
  return (
    <div className="flex  flex-col items-center justify-center min-h-[calc(100vh-96px)]">
      <div className="w-full max-w-sm ">
        <LoginForm />
      </div>
    </div>
  );
}
