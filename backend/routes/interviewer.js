import express from 'express';
const router = express.Router();
//import { Interviewer } from '../models/jobSchema.js';
import { Recruiter } from '../models/candidateModel.js';


// POST - Create a new interviewer
router.post('/', async (req, res) => {
  try {
    const interviewer = new Recruiter(req.body);
    await interviewer.save();
    res.status(201).send(interviewer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all interviewers
router.get('/all', async (req, res) => {
  try {
    const interviewers = await Recruiter.find({});
    res.send(interviewers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a single interviewer by ID
router.get('/:interviewerId', async (req, res) => {
  try {
    const interviewer = await Recruiter.findById(req.params.interviewerId);
    if (!interviewer) {
      return res.status(404).send();
    }
    res.send(interviewer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT - Update an interviewer by ID
router.put('/:interviewerId', async (req, res) => {
  try {
    const interviewer = await Recruiter.findByIdAndUpdate(req.params.interviewerId, req.body, { new: true, runValidators: true });
    if (!interviewer) {
      return res.status(404).send();
    }
    res.send(interviewer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete an interviewer by ID
router.delete('/:interviewerId', async (req, res) => {
  try {
    const interviewer = await Recruiter.findByIdAndDelete(req.params.interviewerId);
    if (!interviewer) {
      return res.status(404).send();
    }
    res.send(interviewer);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
