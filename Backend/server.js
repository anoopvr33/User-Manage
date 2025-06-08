import express from "express";
import cors from "cors";
import mongoose from "./db/db.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((req, res) => {
  res.json({ message: "route not found" });
});

app.listen(3330, (req, res) => {
  console.log("server is running on port 3330");
});
