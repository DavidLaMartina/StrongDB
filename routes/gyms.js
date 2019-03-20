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
router.get('/gyms/:gym_id', function(req, res){
  // Get one specific gym
  axiosInstance.get('API/gyms/' + req.params.gym_id)
    .then(response => {
      if(response.data.gym){
        res.render("show", response.data);
      }else{
        res.send("gym not found");
      }
    })
    .catch(error => {
      res.send("Gym not found");
    })
})
router.get('/new', function(req, res){
  axiosInstance.get('API/equipment')
    .then(response => {
      res.render('new', response.data);
    })
    .catch(error => {
      res.send('Error generating new gym page');
    })
})

module.exports = router;
