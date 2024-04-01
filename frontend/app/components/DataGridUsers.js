"use client"

import React, { useEffect, useState } from 'react';
import { GET_ALL_USERS } from "@/lib/constants";

function SettingsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GET_ALL_USERS);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Ensure jsonData is an array
        if (!Array.isArray(jsonData)) {
          throw new Error('Data received is not an array');
        }
        setUsers(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <div key={index} className="border rounded p-4">
            <img src={user.picture} alt={user.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{user.city}</p>
            <p className="text-sm text-gray-600 mb-2">{user.email}</p>
            <p className="text-sm">{user.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsPage;