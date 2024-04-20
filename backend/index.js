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
app.use(cors());
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

app.post(
  "/uploadResume/:userId",
  upload.single("file"),
  async (req, res, next) => {
    const file = req.file;
    const userID = req.params.userId;

    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    try {
      // Create new instance of File model
      const newFile = new MyResumeSchema({
        // filename: req.body.customFileName || file.originalname,
        contentType: file.mimetype,
        data: file.buffer,
      });

      // Save file to MongoDB
      await newFile.save();
      const newdata = {
        data: file.buffer.toString("base64"),
        id: userID,
        job_description: "hi",
      };

      const flaskResponse = await axios.post(
        "http://localhost:9999/predict",
        newdata
      );

      console.log("Flask response:", flaskResponse.data);

      // const flaskResponse = await axios.post('http://localhost:9999/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      // const flaskResponse = await axios.post("http://localhost:9999/upload", {
      //   file: file.buffer.toString("base64"), // Convert buffer to base64 string
      //   filename: file.originalname,
      //   contentType: file.mimetype,
      // });

      // console.log("Flask response:", flaskResponse.data);

      // const formData = new FormData();
      // formData.append('file', file.buffer, {
      //   filename: file.originalname,
      //   contentType: file.mimetype
      // });

      // const flaskResponse = await axios.post('http://localhost:9999/upload', formData, {
      //   headers: {
      //     ...formData.getHeaders()
      //   }
      // });

      // If needed, handle the response from the Flask server here
      // console.log('Response from Flask server:', flaskResponse.data);

      res.send("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      next(error);
    }
  }
);

mongoose.connect(mongoDBURL).then(() => {
  console.log("App is connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
  });
});
