import MQTTBroker from '../mqtt/mqtt'
import Parse from '../mqtt/Parse'
import { ReceiveTopics, SendTopics } from '../mqtt/Topics'
// import { OperatorType } from '../mqtt/Operators'
import UserLog from './UserLogMessages'

export default class MessageHandler {
    constructor () {
        MQTTBroker.getMessage((topic: string, message: string) => {
            console.log('getMessage topic', topic, message)
            var data
            switch (topic) {
                case 'PING':
                    console.log(topic, '-', message)
                    break
                case ReceiveTopics.CRUD_MQTT:
                    data = JSON.parse(message)
                    Parse.crudData(topic, data)
                    break
                case SendTopics.MQTT_CRUD:
                    break
                case ReceiveTopics.USER_LOG:
                    UserLog.saveLog(message)
                    break
                default:
                    data = JSON.parse(message)
                    Parse.deviceData(topic, data)
                    break
            }
        })
    }
}
