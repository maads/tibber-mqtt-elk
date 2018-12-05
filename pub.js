var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.10.142:1883');

client.on('connect', function () {
    client.subscribe('presence');
    // client.publish('ams', 'Hello mqtt ' + new Date().toISOString());
    client.end();
})

// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log('-------------------');
//     console.log(message.toString());
//     console.log(JSON.stringify(topic));
//     client.end();
// })