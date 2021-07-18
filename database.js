
 const mysql = require('mysql');

// // Create connection
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Puercosuelto",
  database: "Square_Tire",
});

// Check connection
mysqlConnection.connect(error => {
  if(error) throw error;
  console.log('Db is running');
});



 module.exports = mysqlConnection;