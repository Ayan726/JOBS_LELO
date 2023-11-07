const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { NotFound } = require('../errors')

const getMyJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.userId})
    res.status(StatusCodes.OK).json({error: false, data: {jobs, count: jobs.length}})
}
const createMyJobs = async (req, res) => {
    req.body.createdBy = req.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({error: false, data: {job}})
}
const getSingleJob = async (req, res) => {
    const {id:_id} = req.params
    const job = await Job.findOne({_id, createdBy: req.userId})
    if(!job){
        throw new NotFound(`Cannot find job with id : ${_id}!!`)
    }

    res.status(StatusCodes.OK).json({error: false, data: {job}})
}
const updateSingleJob = async (req, res) => {
    res.send('update a job')
}
const deleteSingleJob = async (req, res) => {
    res.send('delete a job')
}

module.exports = {
    getMyJobs,
    createMyJobs,
    getSingleJob,
    updateSingleJob,
    deleteSingleJob
}