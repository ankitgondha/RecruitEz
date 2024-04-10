import express from 'express';
const router = express.Router();
import {Candidate} from '../models/candidateModel.js';
//import {User} from '../models/jobSchema.js';

// POST - Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new Candidate(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET - Retrieve all users
router.get('/all', async (req, res) => {
  try {
    const users = await Candidate.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET - Retrieve a user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await Candidate.findById(req.params.userId);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT - Update a user by ID
router.put('/:userId', async (req, res) => {
  try {
    const user = await Candidate.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - Delete a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const user = await Candidate.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;