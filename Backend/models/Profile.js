import mongoose from "mongoose"

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  fromYear: { type: String, required: true },
  toYear: { type: String, required: true },
  cgpa: { type: String },
  isPercentage: { type: Boolean, default: false },
})

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
})

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  fromYear: { type: String, required: true },
  toYear: { type: String, required: true },
  description: { type: String },
})

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
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
  name: { type: String, required: true },
  designation: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  linkedin: { type: String },
  github: { type: String },
  description: { type: String },
  location:{ type: String },
  skills: [{ type: String }],
  education: [EducationSchema],
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  certifications: [CertificationSchema],
  hobbies: [{ type: String }],
  imageSrc: { type: String, default: "https://via.placeholder.com/100" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field on save
ProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export const Profile = mongoose.model("Profile", ProfileSchema)
