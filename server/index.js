require("dotenv").config();
const express = require("express");
const { send } = require("./chatgpt");

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.static("build"));

app.get("/", async (req, res) => {
  res.send("Bunnymind API");
});

app.get("/api/chatgpt", async (req, res, next) => {
  try {
    const { prompt, temperature } = req.query;
    const data = await send(prompt, parseFloat(temperature));
    res.json({ data });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
