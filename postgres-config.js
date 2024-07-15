import pg from "pg";

export const db = new pg.Pool({
  user: "personal",
  host: "localhost",
  database: "tiendaapi",
  password: "1234",
  port: 5432,
});

db.on("error", (err, client) => {
  console.error("Unexpected error", err);
  process.exit(-1);
});
