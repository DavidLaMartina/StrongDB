var express             = require('express'),
    router              = express.Router();

router.get('/', function(req, res){
  // Call GET API function - get all gyms
  res.render("index");
});

module.exports = router;
