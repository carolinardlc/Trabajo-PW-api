import pg from "pg";
import fs from "node:fs";

console.log("pg user: ", process.env.PGUSER)

export const db = new pg.Pool({
  //user: "personal",
  //host: "localhost",
  //database: "tiendaapi",
  //password: "1234",
  //port: 5432,
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  connectionString: process.env.PGCONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.on("error", (err, client) => {
  console.error("Unexpected error", err);
  process.exit(-1);
});

fs.readFile("./create_tables.sql", "utf8", (err, data) => {
  if (err) {
    console.error("ERROR creating tables: ", err);
    process.exit(1);
  }

  db.query(data);
});
