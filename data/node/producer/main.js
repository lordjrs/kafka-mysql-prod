// producer funcional
var mysql = require('mysql');
require('dotenv').config()
const kafka = require("kafka-node");
const client = new kafka.KafkaClient({kafkaHost: process.env.ADDRESS+':'+process.env.PORT});
const producer = new kafka.Producer(client);

var mysql = require('mysql');

var con = mysql.createConnection(
    { host: process.env.MYSQLPORT,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASS,
      database: process.env.MYSQLDATABASE,
      port: 3306
    });

con.connect(function(err) {
	setInterval( () => {
	  if (err) throw err;
	  con.query("SELECT * FROM customers WHERE enum_col is NULL", function (err, result, fields) {
		if (err) throw err;
		result.forEach(element => {
			//console.log(element);
			//console.log("__");
			var payload = [{ topic: "zb-data", messages: JSON.stringify(element)}];

			producer.send(payload, function(error, result) {   
				console.log("Enviando payload a Kafka");    
				if (error) {
				  console.log( "Envio fallido: ", error);    
				} else {      
				  console.log("Resultado del envio:", result);    
				}  
			});
		});
		console.log(result);
	  });
	  
	  con.query("UPDATE `customers` SET `enum_col` = 'r' WHERE `customers`.`enum_col` is null;", function(err2, result2, fields2){
		if (err2) throw err2;
      });
	}, 10000)
});