import React from "react";

const Settingspage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <section className="bg-white mx-4 p-4 sm:p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 ">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Describe Yourself
        </h2>
        <form className="flex flex-col gap-4 py-6">
          <input
            type="text"
            placeholder="Profile Picture Link"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Description"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>

          <button className="bg-blue-500 text-white rounded-md py-2 transition-colors duration-300">
            Publish
          </button>
        </form>
      </section>
    </div>
  );
};

export default Settingspage;
