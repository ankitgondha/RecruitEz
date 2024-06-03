import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";
import interviewerRoutes from "./routes/interviewer.js";
import jobTrackerRoutes from "./routes/jobtracker.js";
import resumesAtsRoutes from "./routes/resumesAts.js";
import submittedResumesRoutes from "./routes/resumes.js";
import jobRoutes from "./routes/jobs.js";

import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import MyResumeSchema from "./models/ResumePdf.js";
import multer from "multer";
// import morgan from "morgan";
import axios from "axios";

dotenv.config();
const app = express();
const storage = multer.memoryStorage(); // Store file data in memory
const upload = multer({ storage: storage });

//middlewares
app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());
// app.use(cors({ origin: "*", credentials: true }));
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome ats");
});

app.use("/users", userRoutes);
app.use("/interviewer", interviewerRoutes);
app.use("/jobtracker", jobTrackerRoutes);
app.use("/resumesAts", resumesAtsRoutes);
app.use("/resumes", submittedResumesRoutes);
app.use("/jobs", jobRoutes);
app.use("/api/v1/auth", authRoutes);

mongoose.connect(mongoDBURL).then(() => {
  console.log("App is connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
  });
});
