import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import enterRoute from "./routes/enter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", enterRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
