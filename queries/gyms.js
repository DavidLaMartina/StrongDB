var queries = {}

const request = require('request');

/* Get filtered list of gyms based on equipment numbers */
queries.getGyms = function(req, res, context, complete){
  var sql = "SELECT g.gym_id, g.gym_name FROM " +
    "Gyms g LEFT JOIN " +
    "Gym_Equipment ge ON g.gym_id = ge.equipment_gym LEFT JOIN " +
    "Equipment_Types et ON ge.equipment_type = et.equipment_id ";
  if (Object.keys(req.query).length > 0) sql += "WHERE ";
  var counter = 0;
  for (const id in req.query){
    sql += "g.gym_id IN (SELECT ge.equipment_gym FROM Gym_Equipment ge " +
      "WHERE ge.equipment_type = " + id + " AND " +
      "ge.equipment_quantity >= " + req.query[id] + ")"
    if (counter < Object.keys(req.query).length - 1) sql += " AND ";
    counter++;
  }
  sql += "GROUP BY g.gym_id";

  mysql.pool.query(sql, function(error, results, fields){
    if(error){
      context.gyms = JSON.stringify(error);
    }else{
      context.gyms = results;
    }
    complete();
  });
}
/* Get list of possible equipment */
queries.getEquipment = function(req, res, context, complete){
  var sql = "SELECT * FROM Equipment_Types";
  mysql.pool.query(sql, function(error, results, fields){
    if(error){
      context.availabe = JSON.stringify(error) ;
    }else{
      context.available = results;
    }
    complete();
  })
}
/* Get information for specific gym */
queries.getGym = function(req, res, context, complete){
  var sql = "SELECT * FROM Gyms g WHERE g.gym_id = ?";
  var args = [req.params.gym_id];
  mysql.pool.query(sql, args, function(error, results, fields){
    if(error){
      context.gym = JSON.stringify(error);
    }else{
      context.gym = results;
    }
    complete();
  });
}
/* Get all equipment types and quantities for specific gym */
queries.getGymEquipment = function(req, res, context, complete){
  var sql = "SELECT et.equipment_id, et.equipment_name, ge.equipment_quantity FROM " +
    "(SELECT gym_id FROM Gyms WHERE gym_id = ?) as g LEFT JOIN " +
    "Gym_Equipment ge ON g.gym_id = ge.equipment_gym LEFT JOIN " +
    "Equipment_Types et ON ge.equipment_type = et.equipment_id";
  var args = [req.params.gym_id];
  mysql.pool.query(sql, args, function(error, results, fields){
    if(error){
      context.equipment = JSON.stringify(error);
    }else{
      context.equipment = results;
    }
    complete();
  });
}

function geoCode(req, context){
  var address = encodeURIComponent(req.address);
  request('', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
  });
}

/* Create new gym */
queries.addGym = function(req, res, context, complete){
  var sql = "INSERT INTO Gyms (gym_name, gym_owner, gym_website, gym_instagram, " +
    "gym_facebook, gym_phone, date_added) VALUES (?,?,?,?,?,?,?)";
  var args = [
    req.body.gym_name,
    req.body.gym_owner || null,
    req.body.gym_website || null,
    req.body.gym_instagram || null,
    req.body.gym_facebook || null,
    req.body.gym_phone || null,
    new Date() || null
  ];
  mysql.pool.query(sql, args, function(error, results, fields){
    if (error){
      context.new = JSON.stringify(error);
    }else{
      context.new = results;
    }
    complete();
  });
}
/* Delete gym */
queries.deleteGym = function(req, res, context, complete){
  var sql = "DELETE FROM Gyms WHERE gym_id = ?";
  var args = [req.params.gym_id];
  mysql.pool.query(sql, args, function(error, results, fields){
    if(error){
      context.delete = JSON.stringify(error);
    }else{
      context.delete = results;
    }
    complete();
  });
}
/* Add equipment to gym by inserting into gym_equipment */
queries.addGymEquipment = function(req, res, context, complete){
  var sql = "INSERT INTO Gym_Equipment (equipment_gym, equipment_type, " +
    "equipment_quantity) VALUES ";
  var counter = 0;
  var args = []
  for (const insert in req.body.inserts){
    sql += "(?, ?, ?)"
    args.push(req.params.gym_id);
    args.push(req.body.inserts[counter][0]);
    args.push(req.body.inserts[counter][1]);
    if (counter < Object.keys(req.body.inserts).length - 1) sql += ", ";
    counter++;
  }
  mysql.pool.query(sql, args, function(error, results, fields){
    if(error){
      context.inserted = JSON.stringify(error);
    }else{
      context.inserted = results;
    }
    complete();
  })
}

module.exports = queries;
