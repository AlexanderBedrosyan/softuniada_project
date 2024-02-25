import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Fixed import statement
import { Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import styles from "./animation.module.css";
import { z, ZodError } from "zod";

// Define schema using Zod
const registrationSchema = z.object({
  username: z.string().min(3, "Username must contain at least 3 characters"),
  email: z
    .string()
    .email()
    .regex(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      "Invalid email format"
    ),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must include at least one uppercase letter and one symbol"
    ),
});

const RegistrationForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to hold error messages for each field
  const [shake, setShake] = useState(false); // State to trigger shake animation

  useEffect(() => {
    // Reset shake animation after a brief delay
    const shakeTimeout = setTimeout(() => {
      setShake(false);
    }, 1000);

    return () => clearTimeout(shakeTimeout);
  }, [shake]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Validate input data against schema
      registrationSchema.parse({ username, email, password });

      const registrationData = { username, email, password };

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      setEmail("");
      setUsername("");
      setPassword("");
      setIsLoading(false);

      if (!response.ok) {
        setShake(true);
        throw new Error("Failed to register");
      }

      router.push("/home");
    } catch (error) {
      setShake(true);
      setIsLoading(false);
      if (error instanceof ZodError) {
        // Handle validation errors
        setErrors(
          error.errors.reduce((prev, curr) => {
            prev[curr.path.join(".")] = curr.message;
            return prev;
          }, {})
        );
      } else {
        console.error("Registration failed:", error.message);
        setErrors({ _general: "Registration failed. Please try again." });
        setShake(true); // Trigger shake animation
      }
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 flex justify-center items-center ${
        shake ? `${styles.animateshake}` : ""
      }`}
    >
      <section className="bg-white mx-4 p-4 sm:p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 ">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Get Started With Us! 🏡
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4 py-6">
          {/* Display error messages */}
          {errors._general && (
            <div className="text-red-600">{errors._general}</div>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.username && (
            <div className="text-red-600">{errors.username}</div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.email && <div className="text-red-600">{errors.email}</div>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <div className="text-red-600">{errors.password}</div>
          )}

          <Button
            type="submit"
            className={`${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } bg-blue-500 text-white rounded-md py-2 transition-colors duration-300`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner
                label="Loading..."
                color="white"
                labelColor="white"
                size="sm"
                className="wrapper"
              />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default RegistrationForm;
