const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: Number, 
    jobTrackerId: Schema.Types.ObjectId,
    jobAppliedId: Schema.Types.ObjectId,
    resume: String,
    profilePath: String,
    contactInformation: String,
    email: String,
    intro: String,
  },
  { timestamps: true }
);

const interviewerSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: Number,
    jobPostId: Schema.Types.ObjectId,
    company: String,
    profilePath: String,
    contactInformation: String,
    email: String,
  },
  { timestamps: true }
);

const resumesSchema = new Schema(
  {
    submittedOn: Date,
    link: String,
    keyWordVectorId: Schema.Types.ObjectId,
    id: Schema.Types.ObjectId,
    jobId: Schema.Types.ObjectId,
    jobTitle: String,
    userId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const resumesAtsSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    resumesId: Schema.Types.ObjectId,
    contactInformation: String,
    objective: String,
    summary: String,
    education: String,
    educationRating: Number,
    experience: Number,
    skills: [String],
    projects: [String],
    projectsRating: [Number],
    certifications: [String],
    licenses: [String],
    awards: [String],
    honors: [String],
    publications: [String],
    references: [String],
    technicalSkills: [String],
    computerSkills: [String],
    programmingLanguages: [String],
    softwareSkills: [String],
    softSkills: [String],
    languageSkills: [String],
    professionalSkills: [String],
    transferableSkills: [String],
    workExperience: Number,
    professionalExperience: Number,
    employmentHistory: [String],
    internshipExperience: [String],
    volunteerExperience: [String],
    leadershipExperience: [String],
    researchExperience: [String],
    teachingExperience: [String],
  },
  { timestamps: true }
);

const jobTrackerSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    applied: [String],
    noted: [String],
    responses: [String],
  },
  { timestamps: true }
);

const jobSchema = new Schema(
  {
    id: Schema.Types.ObjectId,
    title: String,
    requirements: [String],
    location: String,
    salaryRange: String,
    description: String,
    createdBy: Schema.Types.ObjectId,
    interviews: Number,
    seats: {
      type: Number,
      default: 10
    },
    active: {
      type: Boolean,
      default: true
    },
    candidates: [Schema.Types.ObjectId],
    hired: [Schema.Types.ObjectId],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);



const User = mongoose.model('User', userSchema);
const Resumes = mongoose.model('Resumes', resumesSchema);
const JobTracker = mongoose.model('JobTracker', jobTrackerSchema);
const ResumesATS = mongoose.model('ResumesATS', resumesAtsSchema);
const Interviewer = mongoose.model('Interviewer', interviewerSchema);
const Job = mongoose.model('Job', jobSchema);

module.exports = { User, Resumes, JobTracker, ResumesATS, Interviewer, Job };
