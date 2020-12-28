var mqtt = require('mqtt')
var client = mqtt.connect('wxs://unimacs:tThc7W7DFv@158.85.225.154:1883')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
