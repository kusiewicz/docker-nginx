const { default: axios } = require("axios");
const express = require("express");
const app = express();

const PORT = 4001;

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4444/test.txt");

    res.json({ message: `Hello from port ${PORT}`, content: response.data });
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
