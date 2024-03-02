"use client";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  return (
    <div
      className={`min-h-screen bg-gray-100 flex justify-center items-center`}
    >
      <section className="bg-white mx-4 p-4 sm:p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Welcome back! 👋
        </h2>
        <form onSubmit={loginUser} className="flex flex-col gap-4 py-6">
          {/* Display error messages */}
          {errors._general && (
            <div className="text-red-600">{errors._general}</div>
          )}

          <input
            type="text"
            placeholder="example@example"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

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
            {" "}
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
