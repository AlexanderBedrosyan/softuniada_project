"use client";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import { useState } from "react";
import SubmitButton from "../components/loginform/SubmitButton";
import SignupLink from "../components/loginform/signupLink";
import LoginForm from "../components/loginform/LoginForm";
import { z } from "zod";

const LoginPage = () => {
  const { loginUser, wrongPassword } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Define Zod schema for validation
  const schema = z.object({
    username: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3, { message: "Invalid Password" }),
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
          fieldErrors[err.path[0]] = err.message;
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
          <LoginForm
            setUsername={setUsername}
            setPassword={setPassword}
            errors={errors}
            username={username}
            password={password}
          />
          <SubmitButton isLoading={isLoading} />
        </form>
        <SignupLink />
      </section>
    </div>
  );
};

export default LoginPage;
