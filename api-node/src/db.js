const fs = require("fs");

const { Pool } = require("pg");

// databaseUrl =
//   process.env.DATABASE_URL ||
//   fs.readFileSync(process.env.DATABASE_URL_FILE, "utf8");

const pool = new Pool({
  connectionString: 'postgresql://admin:wasdwasd@localhost:7432/admin',
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
