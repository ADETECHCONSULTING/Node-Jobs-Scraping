var express = require('express');
var router = express.Router();
const LinkedInScrape = require('../LinkedInScrape');
const fetch = require('node-fetch'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  LinkedInScrape.linkedinJobs()
  .then((value) => {
    console.log(value);
    res.send(value)
  })
});

module.exports = router;

