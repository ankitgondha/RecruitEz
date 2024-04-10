import express from 'express';
const router = express.Router();
import { Resumes } from '../models/jobSchema.js';

// POST - Submit a new resume
router.post('/', async (req, res) => {
  try {
    const resume = new Resumes({
      ...req.body,
      submittedOn: new Date() // Automatically set the submission date
    });
    await resume.save();
    res.status(201).send(resume);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all submitted resumes
router.get('/all', async (req, res) => {
  try {
    const resumes = await Resumes.find({});
    res.send(resumes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a specific resume by ID
router.get('/:resumeId', async (req, res) => {
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
router.put('/:resumeId', async (req, res) => {
  try {
    const resume = await Resumes.findByIdAndUpdate(req.params.resumeId, req.body, { new: true, runValidators: true });
    if (!resume) {
      return res.status(404).send();
    }
    res.send(resume);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a submitted resume by ID
router.delete('/:resumeId', async (req, res) => {
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

export default router;
