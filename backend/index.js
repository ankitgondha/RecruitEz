// import express from "express";
// import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";
// import booksroutes from "./routes/booksroutes.js";
const { PORT, mongoDBURL } = require("./config.js");
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users.js')
const interviewerRoutes = require('./routes/interviewer'); 
const jobTrackerRoutes = require('./routes/jobtracker');
const resumesAtsRoutes = require('./routes/resumesAts.js');
const submittedResumesRoutes = require('./routes/resumes');
const jobRoutes = require('./routes/jobs.js');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome ats");
});

app.use('/users', userRoutes);
app.use('/interviewer', interviewerRoutes);
app.use('/jobtracker', jobTrackerRoutes);
app.use('/resumesAts', resumesAtsRoutes);
app.use('/resumes', submittedResumesRoutes);
app.use('/jobs', jobRoutes);


mongoose.connect(mongoDBURL).then(() => {
  console.log("App is connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
  });
});
