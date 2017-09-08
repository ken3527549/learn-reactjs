var mysql = require('mysql');
var con = mysql.createConnection({
  host: "54.82.51.60",
  user: "ken3527549",
  password: "5632001"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // console.log("Connected!");
});