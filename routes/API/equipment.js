var express             = require('express'),
    queries             = require('../../queries/gyms.js'),
    router              = express.Router();

/* return all possible equipment */
router.get('/', function(req, res){
  var callBackCount = 0;
  var context = {};
  queries.getEquipment(req, res, context, complete);
  function complete(){
    callBackCount++;
    if(callBackCount >= 1){
      res.json(context);
    }
  }
});

module.exports = router;
