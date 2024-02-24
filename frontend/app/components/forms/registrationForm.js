"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter("/registration");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Perform login/authentication logic here
    // Redirect to home page if login is successful
    router.push("/home");
  };

  return (
    <div className="bg-red-200 flex flex-row">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} className="flex flex-row">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
