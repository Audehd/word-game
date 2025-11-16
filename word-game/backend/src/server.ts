import "dotenv/config";
import express, { type Application } from "express";
import mongoose from "mongoose";
import cors from "cors";

import todoRoutes from "./routes/todos.js";
import labelRoutes from "./routes/labels.js";

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/todos", todoRoutes);
app.use("/labels", labelRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
