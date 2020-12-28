import { connect } from 'mqtt';
const client = connect('wxs://localhost:1883');


client.on('connect', function () {
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', '1');
            client.publish('asdasd', '2');
        }
    })
    client.subscribe('asdasd', function (err) {
        if (!err) {
            client.publish('presence', '3');
            client.publish('asdasd', '4');
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic);

    console.log(message.toString())
    client.end()
})
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic);

    console.log(message.toString())
    client.end()
})