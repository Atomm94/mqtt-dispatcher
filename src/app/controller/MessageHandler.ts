import MQTTBroker from '../mqtt/mqtt'
import ParseCrud from '../mqtt/ParseCrud'
import ParseDevice from '../mqtt/ParseDevice'
import { ReceiveTopics, SendTopics } from '../mqtt/Topics'
// import { OperatorType } from '../mqtt/Operators'
// import UserLog from './UserLogMessages'

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
                    ParseCrud.crudData(topic, data)
                    break
                case SendTopics.MQTT_CRUD:
                    break
                case ReceiveTopics.USER_LOG:
                    // UserLog.saveLog(message)
                    break
                    case ReceiveTopics.MQTT_LOG:
                        // UserLog.saveLog(message)
                        break
                default:
                    data = JSON.parse(message)
                    ParseDevice.deviceData(topic, data)
                    break
            }
        })
    }
}
