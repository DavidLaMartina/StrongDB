var express             = require('express'),
    router              = express.Router(),
    axios               = require('axios');

let axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
});

router.get('/', function(req, res){
  // Get all gyms
  axiosInstance.get('API/gyms')
    .then(response => {
      res.render("index", response.data);
    })
    .catch(error => {
      res.render("index");
    })
});
router.get('/:gym_id', function(req, res){
  // Get one specific gym
  axiosInstance.get('API/gyms/:gym_id')
    .then(response => {
      res.render("show", response.data);
    })
    .catch(error => {
      res.render("show");
    })
})

module.exports = router;
