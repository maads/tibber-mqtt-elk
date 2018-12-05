var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.10.142:1883');

var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  host: '192.168.10.142:9200',
  log: 'trace'
});

client.on('connect', function () {
    client.subscribe('ams');
    console.log('subscribing to ams');
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log('-------------------');
    console.log(JSON.stringify(topic));
    const doc = JSON.parse(message.toString()).data.liveMeasurement;
    delete doc.__typename;

    console.log(doc);

    elasticClient.create({
        index: 'tibber',
        type: '_doc',
        id: doc.timestamp,
        body: doc
      });

})