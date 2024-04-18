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
      return res.status(404).send('Job not found');
    }

    // Extract candidateIds from the job's candidates array
    const candidateIds = job.candidates.map(c => c.candidateId);

    // Find candidates with those IDs
    const candidates = await Candidate.find({ '_id': { $in: candidateIds } });
    
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
      return res.status(404).send('Job not found');
    }

    // Extract candidateIds from the interviews array
    const candidateIds = job.interviews.map(interview => interview.candidateId);

    // Find candidates whose IDs are in the candidateIds array
    const candidates = await Candidate.find({ _id: { $in: candidateIds } });

    // Optionally, include interview details if needed
    const candidatesWithInterviewDetails = candidates.map(candidate => {
      const interviewDetails = job.interviews.find(interview => interview.candidateId === candidate._id.toString());
      return {
        ...candidate.toObject(),  // Converting Mongoose document to plain object
        interviewDate: interviewDetails.interviewDate
      };
    });

    res.json(candidatesWithInterviewDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  const { index } = req.body;  // Index of the candidate in the candidates array
  const { jobId } = req.params;

  try {
      // Fetch the current job to access the candidates array
      const job = await Job.findById(jobId);
      if (!job) {
          return res.status(404).json({ success: false, message: "Job not found" });
      }

      // Check the current status and toggle it accordingly
      const currentStatus = job.candidates[index].status;
      const newStatus = currentStatus === 'Selected' ? 'Applied' : 'Selected';

      // Update the status of the specific candidate
      const result = await Job.updateOne(
          { _id: jobId, [`candidates.${index}.candidateId`]: job.candidates[index].candidateId },
          { $set: { [`candidates.$[].status`]: newStatus } }
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
  console.log('Received data for job:', req.body);
  const { index, userId, interviewDate } = req.body;
  const { jobId } = req.params;

  try {
    // Find the job document first to ensure it exists and to facilitate complex updates
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send('Job not found');
    }

    // Update or add the interview
    let interviewExists = job.interviews.some(interview => interview.candidateId === userId);
    if (interviewExists) {
      // Update existing interview date
      job.interviews = job.interviews.map(interview => 
        interview.candidateId === userId ? { ...interview, interviewDate: interviewDate } : interview
      );
    } else {
      // Add a new interview
      job.interviews.push({ candidateId: userId, interviewDate: interviewDate });
    }

    // Update candidate status to 'interview'
    if (index >= 0 && index < job.candidates.length && job.candidates[index].candidateId === userId) {
      job.candidates[index].status = 'Interview';
    } else {
      return res.status(400).send('Candidate index is out of bounds or candidate ID mismatch');
    }

    // Save the updated job document
    await job.save();

    res.json({
      success: true,
      message: interviewExists ? 'Interviewee updated successfully' : 'New interviewee added successfully',
      job
    });
  } catch (error) {
    console.error('Error adding/updating interviewee:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});




// Route to set a candidate's status to 'hired' and remove them from interviews
router.put('/:jobId/hire-candidate', async (req, res) => {
  const { jobId } = req.params;
  const { candidateId } = req.body;

  try {
    // Find the job with the given jobId
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({ error: 'Job not found' });
    }

    // Find the candidate in the candidates array
    const candidateIndex = job.candidates.findIndex(cand => cand.candidateId === candidateId);
    if (candidateIndex === -1) {
      return res.status(400).send({ error: 'Candidate not found in job candidates' });
    }

    // Remove the candidate from the interviews array
    job.interviews = job.interviews.filter(interview => interview.candidateId !== candidateId);

    job.candidates[candidateIndex].status = 'Hired';
    job.hired.push(candidateId);

    await job.save();

    res.send({ message: 'Candidate has been hired and removed from interviews.' });
  } catch (error) {
    console.error('Error hiring candidate:', error);
    res.status(500).send({ error: 'Failed to update job for hiring candidate' });
  }
});


//to reject a candidate
router.put('/:jobId/reject', async (req, res) => {
  const { userId } = req.body; 
  const { jobId } = req.params;

  try {
      // Use $addToSet to avoid adding duplicates
      const job = await Job.findByIdAndUpdate(jobId);

      if (!job) {
          return res.status(404).send('Job not found');
      }

      const candidateIndex = job.candidates.findIndex(cand => cand.candidateId === userId);
    if (candidateIndex === -1) {
      return res.status(400).send({ error: 'Candidate not found in job candidates' });
    }

    // Remove the candidate from the interviews array
    job.interviews = job.interviews.filter(interview => interview.candidateId !== userId);

    // Update the status of the candidate to 'rejected'
    job.candidates[candidateIndex].status = 'Rejected';


    // Save the job document
    await job.save();

      res.json({ success: true, message: 'rejected successfully', job });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
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
