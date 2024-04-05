import React, { useEffect, useState, useContext } from "react";
import AuthContext from "@/contexts/authContext";
import { GET_ALL_USERS } from "@/lib/constants";
import { POST_RATING } from "@/lib/constants";
import { Card, CardHeader, CardBody, ScrollShadow } from "@nextui-org/react";

function SettingsPage() {
  const { user } = useContext(AuthContext);
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
        const jsonString = await response.json();
        const jsonData = JSON.parse(jsonString);
        setUsers(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRatingClick = async (
    userEmail,
    ratingValue,
    voter_email = user.email
  ) => {
    try {
      // Make an API request to send the rating value to the backend
      const response = await fetch(`${POST_RATING}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: ratingValue,
          email: userEmail,
          voter_email,
        }),
      });
      console.log(user)
      if (!response.ok) {
        throw new Error("Failed to send rating to the backend");
      }

      console.log(
        `Rating ${ratingValue} for user ${userEmail} sent to the backend successfully.`
      );
    } catch (error) {
      console.error(`Error sending rating:${userEmail}:${ratingValue}`, error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Users</h1>
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
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
                      Contact: {user.email}
                    </small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <img
                      alt="Card background"
                      src={user.picture}
                      className="w-full h-full object-cover"
                    />

                    <h4 className="font-bold text-large">
                      <ScrollShadow className="w-full h-64">
                        <p>{user.description}</p>
                      </ScrollShadow>
                    </h4>

                    {/* Rating Component */}
                    <div className="flex items-center mt-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="mr-2 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onClick={() => handleRatingClick(user.email, rating)}
                        >
                          {rating <= user.rating ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3.219l1.937 3.845 4.366.635a.5.5 0 0 1 .277.857l-3.158 2.901.747 4.394a.5.5 0 0 1-.723.527L10 14.303l-3.91 2.053a.5.5 0 0 1-.723-.526l.747-4.394-3.158-2.9a.5.5 0 0 1 .277-.857l4.366-.635L10 3.22z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3.219l1.937 3.845 4.366.635a.5.5 0 0 1 .277.857l-3.158 2.901.747 4.394a.5.5 0 0 1-.723.527L10 14.303l-3.91 2.053a.5.5 0 0 1-.723-.526l.747-4.394-3.158-2.9a.5.5 0 0 1 .277-.857l4.366-.635L10 3.22z"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )
        )}
      </section>
    </main>
  );
}

export default SettingsPage;
