"use client";

import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "@/lib/constants";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

function SettingsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GET_ALL_USERS);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonstring = await response.json();

        const jsonData = JSON.parse(jsonstring);
        setUsers(jsonData);
      } catch (error) {
        setError(error);
      } finally {
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {users.map(
          (user, index) =>
            user.picture && (
              <div
                key={index}
                className=" p-4 mb-1 transition-all duration-500 ease-in-out transform hover:scale-105 "
              >
                <Card className="py-4 ">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{user.name}</p>
                    <small className="text-default-500">{user.city}</small>
                    <small className="text-default-500">
                      {" "}
                      Conatc: {user.email}
                    </small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <img
                      alt="Card background"
                      src={user.picture}
                      className="w-full h-full object-cover"
                    />
                    <h4 className="font-bold text-large">{user.description}</h4>
                  </CardBody>
                </Card>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
