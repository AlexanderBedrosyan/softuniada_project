"use client";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod"; // Import Zod

const LoginPage = () => {
  const { loginUser, authTokens } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to hold validation errors

  // Define Zod schema for validation
  const schema = z.object({
    username: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Invalid Password" }),
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form inputs
    const inputData = { username, password };
    try {
      schema.parse(inputData); // Validate inputs against schema
      setErrors({}); // Reset errors
      await loginUser(e); // Pass event along with input data to loginUser
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message; // Map each error to its corresponding field
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 flex justify-center items-center`}
    >
      <section className="bg-white mx-4 p-4 sm:p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Welcome back! 👋
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 py-6"
        >
          <input
            type="text"
            placeholder="example@example"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}{" "}
          {/* Display username error */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}{" "}
          {/* Display password error */}
          <button
            type="submit"
            className={`${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } bg-blue-500 text-white rounded-md py-2 transition-colors duration-300`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p>
          Don't have an account yet?
          <Link href="/">
            <span className="text-blue-500 ml-2">Sign Up</span>
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
