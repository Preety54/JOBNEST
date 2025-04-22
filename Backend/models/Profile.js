import mongoose from "mongoose"

const EducationSchema = new mongoose.Schema({
  degree: { type: String },
  institution: { type: String },
  fromYear: { type: String },
  toYear: { type: String },
  cgpa: { type: String },
  isPercentage: { type: Boolean, default: false },
})

const ProjectSchema = new mongoose.Schema({
  name: { type: String },
  companyName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
})

const ExperienceSchema = new mongoose.Schema({
  title: { type: String },
  company: { type: String },
  fromYear: { type: String },
  toYear: { type: String },
  description: { type: String },
})

const CertificationSchema = new mongoose.Schema({
  name: { type: String },
  issuer: { type: String },
  credentialId: { type: String },
  date: { type: String },
  expiryDate: { type: String },
})

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: { type: String, default: "" },
  designation: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  description: { type: String, default: "" },
  location: { type: String, default: "" },
  skills: [{ type: String }],
  education: [EducationSchema],
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  certifications: [CertificationSchema],
  hobbies: [{ type: String }],
  imageSrc: { type: String, default: "" },
  resume: { type: String, default: "" }, // ✅ New resume field
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
})

// Update the updatedAt field on save
ProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export const Profile = mongoose.model("Profile", ProfileSchema)
