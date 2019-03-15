var express             = require('express'),
    router              = express.Router();

router.get('/', function(req, res){
  res.send("Hello from gym API route");
})

router.get('/:gym_id', function(req, res){
  var sql = "SELECT * FROM Gyms WHERE gym_id = ?";
  var inserts = [req.params.gym_id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      res.json(error);
    }else{
      res.json(results);
    }
  })
});

router.post('/', function(req, res){
  var sql = "INSERT INTO Gyms (gym_name, gym_owner, gym_website, gym_instagram," +
    "gym_facebook, gym_phone, date_added) VALUES (?,?,?,?,?,?,?)";
  var inserts = [
    req.body.gym_name,
    req.body.gym_owner || null,
    req.body.gym_website || null,
    req.body.gym_instagram || null,
    req.body.gym_facebook || null,
    req.body.gym_phone || null,
    new Date() || null
  ];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      res.jason(error);
    }else{
      res.json(results);
    }
  })
});

module.exports = router;
