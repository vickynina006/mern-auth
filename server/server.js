import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userDataRouter from "./routes/userDataRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRouter);
app.use("/api", userDataRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
