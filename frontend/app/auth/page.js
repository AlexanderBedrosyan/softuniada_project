import React from "react";
import Link from "next/link";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="max-w-md px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Access Denied
        </h2>
        <p className="text-lg text-center text-gray-600 mb-6">
          Oops! It seems you don't have access to this page.
        </p>
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <Link href={"/"}>Go Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
