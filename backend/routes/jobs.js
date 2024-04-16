import express from "express";
const router = express.Router();
import { Job } from "../models/jobSchema.js";
import { Candidate } from "../models/candidateModel.js";

// POST - Create a new job
router.post("/", async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      createdBy: req.body.createdBy,
    });
    await job.save();
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all jobs
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a single job by ID
router.get("/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve all candidates for a job by ID
router.get("/:jobId/candidates", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).send();
    }
    const candidates = await Candidate.find({ _id: { $in: job.candidates } });
    res.send(candidates);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve all candidates for a job by ID for Interviews
router.get("/:jobId/interviews", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).send();
    }
    const candidates = await Candidate.find({ _id: { $in: job.interviews } });
    res.send(candidates);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT - Update a job by ID
router.put("/:jobId", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a job by ID
router.delete("/:jobId", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) {
      return res.status(404).send();
    }
    res.send({ message: "Job successfully deleted." });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Apply for the job

router.post("/apply", async (req, res) => {
  const { jobId, userId } = req.body;

  console.log(userId);
  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Jobs not found" });
    }
    const candidates_var = {
      candidateId: userId,
    };
    console.log(candidates_var)

    job.candidates.push(candidates_var);
    await job.save();

    return res
      .status(200)
      .json({ message: "Successfully applied for the job" });
  } catch (error) {
    console.error("Error Applying for the job", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
