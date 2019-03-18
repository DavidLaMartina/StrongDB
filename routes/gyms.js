var express             = require('express'),
    router              = express.Router(),
    axios               = require('axios');

router.get('/', function(req, res){
  // Call GET API function - get all gyms
  axios.get('http://localhost:3000/api/gyms')
    .then(response => {
      res.render("index", response.data);
    })
    .catch(error => {
      res.render("index");
    })
});

module.exports = router;
