const express = require('express')
const router = express.Router()
const {
    getMyJobs,
    createMyJobs,
    getSingleJob,
    updateSingleJob,
    deleteSingleJob
} = require('../controllers/jobs')


router.route('/myjobs').get(getMyJobs).post(createMyJobs)
router.route('/myjobs/:id').get(getSingleJob).patch(updateSingleJob).delete(deleteSingleJob)

module.exports = router

