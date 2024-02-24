import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter("/registration");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Construct registration data object
      const registrationData = { username, email, password };

      // Make a POST request to your API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Redirect to home page if registration is successful
      router.push("/home");
    } catch (error) {
      console.error("Registration failed:", error.message);
      // Handle registration failure, e.g., display error message to user
    }
  };

  return (
    <div className="bg-red-200 flex flex-row">
      <h1>Registration Page</h1>
      <form onSubmit={handleRegister} className="flex flex-row">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
