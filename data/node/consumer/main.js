// consumer funcional
require('dotenv').config()
const { Client } = require('@elastic/elasticsearch')
const config = require('config');
const elasticConfig = config.get('elastic');
const elasticsearch = require('elasticsearch');
const esClient = new Client({
  cloud: {
    id: elasticConfig.cloudID
  },
  auth: {
    username: elasticConfig.username,
    password: elasticConfig.password
  }
});
// configure Kafka Consumer
const kafka = require("kafka-node");
const client = new kafka.KafkaClient({kafkaHost: process.env.ADDRESS+':'+process.env.PORT});
const consumer = new kafka.Consumer(client, [{ topic: "zb-data", partition: 0 }], { autoCommit: false });

console.log("Holi");

consumer.on('message', function (message) {    
    console.log(message.value);
	//var data = JSON.parse(message.value);
	//console.log(data);
    run(message);
});

async function run(datos) {
  await esClient.index({
    index: 'logs-index',
    body: {
      datos
    }
  })

  await esClient.indices.refresh({index: 'logs-index'})
}



/*consumer.on('message', function(message) {
/ if (message.some_special_field === "drop") {
    return; // skip it
  }

  // drop fields (you can use delete message['field1'] syntax if you need
  //  to parse a more dynamic structure)
  delete message.field1;
  delete message.field2;
  delete message.field3;

	

  esClient.index({
    index: 'index-name',
    type: 'type-name',
    id: message.id_field, // ID will be auto generated if none/unset
    body: message
  }, function(err, res) {
    if (err) {
      throw err;
    }
  });
});

consumer.on('error', function(err) {
  console.log(err);
}); */