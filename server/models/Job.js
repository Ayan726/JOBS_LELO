const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name!!"],
      maxLength: 50,
    },
    role: {
      type: String,
      required: [true, "Please provide the role company is hiring for!!"],
      maxLength: 100,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: [true, "Please provide the type of job!!"],
    },
    requirements: {
      type: String,
      default: "N/A",
    },
    applyLink: {
      type: String,
      required: [true, "Please provide an apply link!!"],
    },
    salary: {
      type: Number,
      default: 0,
    },
    yoe: {
      type: Number,
      default: 0,
    },
    workFrom: {
      type: String,
      enum: ["home", "office"],
      default: "office",
    },
    location: {
      type: String,
      default: "N/A",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user!!"],
    },
  },
  {
    collection: "jobs",
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
