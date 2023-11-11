const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFound, BadRequest, Unauthenticated } = require("../errors");

const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.userId });
  res
    .status(StatusCodes.OK)
    .json({ error: false, data: { jobs, count: jobs.length } });
};
const createMyJobs = async (req, res) => {
  req.body.createdBy = req.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ error: false, data: { job } });
};

const getSingleJob = async (req, res) => {
  const { id: _id } = req.params;
  const job = await Job.findOne({ _id, createdBy: req.userId });
  if (!job) {
    throw new NotFound(`Cannot find job with id : ${_id}!!`);
  }

  res.status(StatusCodes.OK).json({ error: false, data: { job } });
};

const updateSingleJob = async (req, res) => {
  const {
    body: {
      company,
      role,
      requirements,
      applyLink,
      salary,
      yoe,
      workFrom,
      location,
    },
    params: { id: _id },
    userId,
  } = req;
  const job = await Job.findOneAndUpdate({ _id, createdBy: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(_id);
  if (!job) {
    throw new NotFound(`Can't find job with id : ${_id}!!`);
  }

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest("Please provide necessary fields to update!!");
  }

  return res.status(StatusCodes.OK).json({ error: false, data: job });
};

const deleteSingleJob = async (req, res) => {
  const {
    params: { id: _id },
    userId,
  } = req;
  const job = await Job.findOneAndDelete({ _id, createdBy: userId });
  if (!job) {
    throw new NotFound(`Can't find job with id : ${_id}`);
  }

  return res.status(StatusCodes.OK).json({ error: false, data: job });
};

const deleteOldJobs = async (req, res) => {
  let thirtyDaysOld = new Date(Date.now());
  thirtyDaysOld.setDate(thirtyDaysOld.getDate() - 30);

  const result = await Job.deleteMany({
    createdBy: req.userId,
    createdAt: { $lte: thirtyDaysOld },
  });
  if (result.deletedCount > 0) {
    return res.status(StatusCodes.OK).json({
      error: false,
      data: { message: `${result.deletedCount} jobs deleted successfully!!` },
    });
  }
  return res
    .status(StatusCodes.OK)
    .json({ error: false, data: { message: "No old jobs found!!" } });
};

module.exports = {
  getMyJobs,
  createMyJobs,
  getSingleJob,
  updateSingleJob,
  deleteSingleJob,
  deleteOldJobs
};
