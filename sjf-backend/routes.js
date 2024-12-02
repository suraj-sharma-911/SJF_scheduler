const express = require('express');
const router = express.Router();
const jobsController = require('./controllers/jobs_controller')

router.get('/getAllJobs', jobsController.getAllJobs);


module.exports = router;