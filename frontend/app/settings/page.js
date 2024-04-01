"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useContext } from "react";
import AuthContext from "@/contexts/authContext";
import { POST_DESCRIPTION } from "@/lib/constants";
import { toast, Toaster } from 'react-hot-toast';
const Settingspage = () => {
  const { user } = useContext(AuthContext); // Get user from context
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${POST_DESCRIPTION}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          description,
          city,
          profilePicture,
        }), // Use user.email to get the email address
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json(); // Access the data returned from the server
      toast.success('Update completed successfully!');
      setCity("");
      setDescription("");
      setProfilePicture("");
      router.push("/home")
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Toaster />
      <section className="bg-white mx-4 p-4 sm:p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 ">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Describe Yourself
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-6">
          <input
              type="text"
              placeholder="Profile Picture Link"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>

          <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 transition-colors duration-300"
          >
            Publish
          </button>
        </form>
      </section>
    </div>
  );
};

export default Settingspage;
