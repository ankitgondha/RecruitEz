const express = require('express');
const router = express.Router();
const { JobTracker } = require('../models/jobSchema.js'); 

// POST - Create a new job tracker record for a user
router.post('/', async (req, res) => {
  try {
    const jobTracker = new JobTracker(req.body);
    await jobTracker.save();
    res.status(201).send(jobTracker);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all job tracker records
router.get('/all', async (req, res) => {
  try {
    const jobTrackers = await JobTracker.find({});
    res.send(jobTrackers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a job tracker record by ID
router.get('/:jobTrackerId', async (req, res) => {
  try {
    const jobTracker = await JobTracker.findById(req.params.jobTrackerId);
    if (!jobTracker) {
      return res.status(404).send();
    }
    res.send(jobTracker);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT - Update a job tracker record by ID
router.put('/:jobTrackerId', async (req, res) => {
  try {
    const jobTracker = await JobTracker.findByIdAndUpdate(req.params.jobTrackerId, req.body, { new: true, runValidators: true });
    if (!jobTracker) {
      return res.status(404).send();
    }
    res.send(jobTracker);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a job tracker record by ID
router.delete('/:jobTrackerId', async (req, res) => {
  try {
    const jobTracker = await JobTracker.findByIdAndDelete(req.params.jobTrackerId);
    if (!jobTracker) {
      return res.status(404).send();
    }
    res.send(jobTracker);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
