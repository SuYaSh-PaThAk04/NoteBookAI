import "dotenv/config"; // 🔹 ES Module friendly

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import retrivalRoutes from "./routes/retrivalRoute.js";
import indexingRoutes from "./routes/indexingRoute.js";
import youtubeRoutes from "./routes/youtubeIndex.js";

import userRoutes from "./routes/user.js";
import connectDB from "./DB/db.js";
const app = express();
connectDB();


const allowedOrigins=[
  "https://knowtify-plum.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173"
];


app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin.trim())) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// app.use(cors({
//   origin: "http://localhost:5173", // 👈 your React app URL
//   credentials: true,               // 👈 allow cookies
// }));


app.use(express.json());
app.use(cookieParser());


app.use("/api", indexingRoutes);
app.use("/api", retrivalRoutes);
app.use("/api", youtubeRoutes);
app.use("/api", userRoutes);

app.get("/api/test", (req, res) => {
  res.send("i am working");
});
const port = process.env.PORT ||8000;
app.listen(port, () => {
  console.log(` App is listening at port ${port}`);
});
