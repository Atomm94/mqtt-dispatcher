import MQTTBroker from '../mqtt/mqtt'
import deviceOperations from '../mqtt/deviceOperations'
import { TopicCodes } from '../mqtt/Topics'
import { OperatorType } from '../mqtt/Operators'
import UserLog from './UserLogMessages'

export default class MessageHandler {
    constructor () {
        MQTTBroker.getMessage((topic: TopicCodes, message: string) => {
            var data = JSON.parse(message)
            switch (topic) {
                case 'PING':
                    console.log(topic, '-', message)
                    break
                case TopicCodes.USER_LOG:
                    UserLog.saveLog(message)
                    break
                case TopicCodes.SUB_TOPIC:
                case TopicCodes.UNSUB_TOPIC:
                    switch (data.operator) {
                        case OperatorType.REGISTRATION:
                            deviceOperations.registration(data, topic)
                            break
                        case OperatorType.LOGIN:

                            MQTTBroker.subscribe(message)
                            break
                        case OperatorType.LOGOUT:

                            MQTTBroker.subscribe(message)
                            break
                        default:
                            break
                    }
                    break
                default:
                    break
            }
        })
    }
}
