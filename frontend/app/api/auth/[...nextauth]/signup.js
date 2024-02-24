import { hashPassword } from "@/lib/auth";
import { openDb } from "@/lib/db";

// Create a handler function for your API route
async function handler(req, res) {
  try {
    // Extract user data from the request body
    const { username, password } = req.body;

    // Open the SQLite database connection
    const db = await openDb();

    const hashedPassword = hashPassword(password);

    // Execute SQL query to insert a new user
    const result = await db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    // Close the database connection
    await db.close();

    // Respond with success message or user ID
    res
      .status(200)
      .json({ message: "User created successfully", userId: result.lastID });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;
