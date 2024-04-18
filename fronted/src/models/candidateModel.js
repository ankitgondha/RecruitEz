import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
    },

    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    jobTrackerId: {
      type: Object,
    },
    jobAppliedId: {
      type: Object,
    },
    resume: {
      type: String,
    },
    profilePath: {
      type: String,
    },
    intro: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const recruiterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1,
    },
    jobPostId: {
      type: Object,
    },

    profilePath: {
      type: String,
    },
    company: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);
const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export { Candidate, Recruiter };
