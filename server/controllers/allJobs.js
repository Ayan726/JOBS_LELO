const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  return res
    .status(StatusCodes.OK)
    .json({ error: false, data: { jobs, count: jobs.length } });
};

module.exports = getAllJobs;
