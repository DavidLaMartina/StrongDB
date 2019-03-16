var express             = require('express'),
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
  var sql = "SELECT * FROM Owners WHERE owner_fname = ? AND owner_lname = ?";
  var args = [req.body.owner_fname || null, req.body.owner_lname || null];
  mysql.pool.query(owner_exists_sql, owner_exists_args, function(error, results, fields){
    if(error){
      res.json(error);
    }else{
      var owner_sql = "INSERT INTO Owners (owner_fname, owner_lname) VALUES (?,?)";
      var owner_args = [req.body.owner_fname || null, req.body.owner_lname || null];
      mysql.pool.query(owner_sql, owner_args, function(error, results, fields){
        if(error){
          res.json(error);
        }else{
          var gym_sql = "INSERT INTO Gyms (gym_name, gym_owner, gym_website, gym_instagram," +
            "gym_facebook, gym_phone, date_added) VALUES (?,?,?,?,?,?,?)";
          var gym_args = [
            req.body.gym_name,
            req.body.gym_owner || null,
            req.body.gym_website || null,
            req.body.gym_instagram || null,
            req.body.gym_facebook || null,
            req.body.gym_phone || null,
            new Date() || null
          ];
          mysql.pool.query(gym_sql, gym_args, function(error, results, fields){
            if(error){
              res.json(error);
            }else{
              res.json(results);
            }
          })
        }
      })
    }
  })
});

// router.post('/', function(req, res){
//   var owner_sql = "INSERT INTO Owners (owner_fname, owner_lname) VALUES (?,?)";
//   var owner_inserts = [
//     req.body.owner_fname || null,
//     req.body.owner_lname || null
//   ]
//   var sql = "INSERT INTO Gyms (gym_name, gym_owner, gym_website, gym_instagram," +
//     "gym_facebook, gym_phone, date_added) VALUES (?,?,?,?,?,?,?)";
//   var inserts = [
//     req.body.gym_name,
//     req.body.gym_owner || null,
//     req.body.gym_website || null,
//     req.body.gym_instagram || null,
//     req.body.gym_facebook || null,
//     req.body.gym_phone || null,
//     new Date() || null
//   ];
//   mysql.pool.query(sql, inserts, function(error, results, fields){
//     if(error){
//       res.json(error);
//     }else{
//       res.json(results);
//     }
//   })
// });

module.exports = router;
