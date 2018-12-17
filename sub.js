var mqtt = require('mqtt');
var client = mqtt.connect( process.env.TIBBER_MQTT);

var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  host: process.env.TIBBER_ELASTIC,
  log: 'trace'
});

client.on('connect', function () {
    client.subscribe(process.env.TIBBER_MQTT_TOPIC || 'ams');
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