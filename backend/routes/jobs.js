import express from 'express';
const router = express.Router();
import { Job } from '../models/jobSchema.js';
import { Candidate } from '../models/candidateModel.js';


// POST - Create a new job
router.post('/', async (req, res) => {
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
router.get('/all', async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a single job by ID
router.get('/:jobId', async (req, res) => {
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
router.get('/:jobId/candidates', async (req, res) => {
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
router.get('/:jobId/interviews', async (req, res) => {
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
router.put('/:jobId', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true, runValidators: true });
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PUT - update selected array to a job by ID
router.put('/toggle-selected/:jobId', async (req, res) => {
  const { index } = req.body;
  const { jobId } = req.params;

  try {
      // Fetch the current job to access the current state of 'selected'
      const job = await Job.findById(jobId);
      if (!job) {
          return res.status(404).json({ success: false, message: "Job not found" });
      }

      // Toggle the boolean at the specified index
      const currentValue = job.selected[index];
      const newValue = !currentValue;

      // Update the job with the new value
      const result = await Job.updateOne(
          { _id: jobId },
          { $set: { [`selected.${index}`]: newValue } }
      );
      res.status(200).json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Delete a job by ID
router.delete('/:jobId', async (req, res) => {
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

// Endpoint to add a user to the interviews array
router.put('/:jobId/add-interviewee', async (req, res) => {
  const { userId } = req.body; // User ID passed from the frontend
  const { jobId } = req.params;

  try {
      // Use $addToSet to avoid adding duplicates
      const job = await Job.findByIdAndUpdate(jobId, 
          { $addToSet: { interviews: userId } },
          { new: true }
      );

      if (!job) {
          return res.status(404).send('Job not found');
      }

      res.json({ success: true, message: 'Interviewee added successfully', job });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

//to hire a candidate
router.put('/:jobId/add-hired', async (req, res) => {
  const { userId } = req.body; // User ID passed from the frontend
  const { jobId } = req.params;

  try {
      // Use $addToSet to avoid adding duplicates
      const job = await Job.findByIdAndUpdate(jobId, 
        { 
          $addToSet: { hired: userId },
          $pull: { interviews: userId }  // Remove the userId from interviews
        },
        { new: true }
      );

      if (!job) {
          return res.status(404).send('Job not found');
      }

      res.json({ success: true, message: 'Interviewee hired successfully', job });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

//to reject a candidate
router.put('/:jobId/reject', async (req, res) => {
  const { userId } = req.body; // User ID passed from the frontend
  const { jobId } = req.params;

  try {
      // Use $addToSet to avoid adding duplicates
      const job = await Job.findByIdAndUpdate(jobId, 
        { 
          $pull: { interviews: userId }  // Remove the userId from interviews
        }
      );

      if (!job) {
          return res.status(404).send('Job not found');
      }

      res.json({ success: true, message: 'rejected successfully', job });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
