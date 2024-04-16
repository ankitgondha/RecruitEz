import express from "express";
const router = express.Router();
import { Resumes } from "../models/jobSchema.js";
import { ResumeFile } from "../models/jobSchema.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// POST - Submit a new resume
router.post("/", async (req, res) => {
  try {
    const resume = new Resumes({
      ...req.body,
      submittedOn: new Date(), // Automatically set the submission date
    });
    await resume.save();
    res.status(201).send(resume);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all submitted resumes
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resumes.find({});
    res.send(resumes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a specific resume by ID
router.get("/:resumeId", async (req, res) => {
  try {
    const resume = await Resumes.findById(req.params.resumeId);
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT - Update a submitted resume by ID
router.put("/:resumeId", async (req, res) => {
  try {
    const resume = await Resumes.findByIdAndUpdate(
      req.params.resumeId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a submitted resume by ID
router.delete("/:resumeId", async (req, res) => {
  try {
    const resume = await Resumes.findByIdAndDelete(req.params.resumeId);
    if (!resume) {
      return res.status(404).send();
    }
    res.send({ message: "Resume successfully deleted." });
  } catch (error) {
    res.status(500).send(error);
  }
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});


const upload = multer({ storage: storage });



router.get("/get-files", async (req, res) => {
  try {
    ResumeFile.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});



router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const fileName = req.file;
  try {
    const data=await ResumeFile.create({  pdf: fileName });
    res.send({ status:data  });
  } catch (error) {
    res.json({ status: error });
  }
});


export default router;
