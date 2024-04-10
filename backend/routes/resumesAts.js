import express from 'express';
const router = express.Router();
import { ResumesATS } from '../models/jobSchema.js'; 

// POST - Create a new resume
router.post('/', async (req, res) => {
  try {
    const resume = new ResumesATS(req.body);
    await resume.save();
    res.status(201).send(resume);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all resumes
router.get('/all', async (req, res) => {
  try {
    const resumes = await ResumesATS.find({});
    res.send(resumes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a single resume by ID
router.get('/:resumeId', async (req, res) => {
  try {
    const resume = await ResumesATS.findById(req.params.resumeId);
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT - Update a resume by ID
router.put('/:resumeId', async (req, res) => {
  try {
    const resume = await ResumesATS.findByIdAndUpdate(req.params.resumeId, req.body, { new: true, runValidators: true });
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a resume by ID
router.delete('/:resumeId', async (req, res) => {
  try {
    const resume = await ResumesATS.findByIdAndDelete(req.params.resumeId);
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;