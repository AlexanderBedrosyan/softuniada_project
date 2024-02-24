// Import the sqlite3 package
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Create a handler function for your API route
export async function openDb() {
  return open({
    filename: "../../softuniada_project/db.sqlite3",
    driver: sqlite3.Database,
  });
}

// Export the handler function
export default connectToDataBase;
