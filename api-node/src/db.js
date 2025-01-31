const fs = require("fs");

const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "host.docker.internal",
  database: "admin",
  password: "wasdwasd",
  port: 7432,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const getDateTime = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT NOW() as now;");
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

module.exports = { getDateTime };
