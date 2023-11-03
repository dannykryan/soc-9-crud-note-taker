import { pool } from "../index.mjs";

async function resetDatabase() {
  try {
    //delete database if exists
    await pool.query(`DROP TABLE IF EXISTS notes CASCADE`);
    //create database
    await pool.query(
      `CREATE TABLE notes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    title VARCHAR(50) NOT NULL,
    note VARCHAR(250) NOT NULL);`
    );
    //seed database
    await pool.query(`
    INSERT INTO notes
    (title, note)
    VALUES ('shopping list', 'fish, eggs, bananas, catnip'),
    ('Meeting with Mr. Smith', 'Tuesday at 9. Bring an apple');
   `);
   console.log("reset database success")
  } catch (error) {
    console.error("Database failed to reset: ", error);
  } finally {
    // closes the pool to the database
    await pool.end();
  }
}

await resetDatabase();
