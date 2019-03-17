var express             = require('express'),
    queries             = require('../../queries/gyms.js'),
    router              = express.Router();

// https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
// function query(sql, inserts){
//   return new Promise( (resolve, reject) => {
//     mysql.pool.query(sql, inserts, (err, rows) => {
//       if (err){
//         return reject(err);
//       }else{
//         resolve(rows);
//       }
//     });
//   });
// }

/* Return set of gyms based on search crit: # of pieces of types of equipment
  Includes list of all available equipment types */
router.get('/', function(req, res){
  var callBackCount = 0;
  var context = {};
  queries.getGyms(req, res, context, complete);
  queries.getEquipment(req, res, context, complete);
  function complete(){
    callBackCount++;
    if(callBackCount >= 2){
      res.json(context);
    }
  }
});
/* Return specific gym with its equipment */
router.get('/:gym_id', function(req, res){
  var callBackCount = 0;
  var context = {};
  queries.getGym(req, res, context, complete);
  queries.getGymEquipment(req, res, context, complete);
  function complete(){
    callBackCount++;
    if(callBackCount >= 2){
      res.json(context);
    }
  }
});
/* Create new gym */
router.post('/', function(req, res){
  var callBackCount = 0;
  var context = {};
  queries.addGym(req, res, context, complete);
  function complete(){
    callBackCount++;
    if(callBackCount >= 1){
      res.json(context);
    }
  }
});
/* Add equipment to gym */
router.put('/:gym_id', function(req, res){
  var callBackCount = 0;
  var context = {};
  queries.addGymEquipment(req, res, context, complete);
  function complete(){
    callBackCount++;
    if(callBackCount >= 1){
      res.json(context);
    }
  }
})
/* Delete gym */
router.delete('/:gym_id', function(req, res){
  var callBackCount = 0;
  var context = {};
  queries.deleteGym(req, res, context, complete);
  function complete(){
    callBackCount++;
    if(callBackCount >= 1){
      res.json(context);
    }
  }
});

module.exports = router;
