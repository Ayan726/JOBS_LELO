const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

const getAllJobs = async (req, res) => {
  const { company, sort, numericFilters, location, jobtype, workfrom } =
    req.query;
  let queryObject = {};
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  if (location) {
    queryObject.location = { $regex: location, $options: "i" };
  }
  if (jobtype) {
    const options = ["full-time", "part-time", "contract", "internship"];
    if (options.includes(jobtype)) {
      queryObject.jobType = jobtype;
    }
  }
  if (workfrom) {
    const options = ["home", "office"];
    if (options.includes(workfrom)) {
      queryObject.workFrom = workfrom;
    }
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["salary", "yoe"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Job.find(queryObject);

  if (sort) {
    const options = ["createdAt", "salary"];
    if (options.includes(sort)) {
      result = result.sort(`-${sort}`);
    }
  } else {
    result = result.sort("createdAt");
  }

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;
  return res.status(StatusCodes.OK).json({
    error: false,
    data: { jobs, count: jobs.length, page: page, perPage: limit },
  });
};

module.exports = getAllJobs;
