// Import the sqlite3 package
import sqlite3 from "sqlite3";

// Create a handler function for your API route
async function handler(req, res) {
  // Open a connection to your SQLite database
  const db = new sqlite3.Database("path/to/your/database.db", (err) => {
    if (err) {
      console.error("Error opening database connection:", err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Connected to the SQLite database.");

      // Perform database operations here

      // Close the database connection when done
      db.close((err) => {
        if (err) {
          console.error("Error closing database connection:", err.message);
        } else {
          console.log("Database connection closed.");
        }
      });
    }
  });
}

// Export the handler function
export default handler;
