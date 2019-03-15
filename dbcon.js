var mysql         = require('mysql');
var pool          = mysql.createPool({
  host            : 'localhost',
  user            : 'dlamartina',
  password        : 'password',
  database        : 'StrongDB'
});
module.exports.pool = pool;
