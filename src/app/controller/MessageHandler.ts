import MQTTBroker from '../mqtt/mqtt'
import { TopicCodes } from '../mqtt/Topics'
import UserLog from './UserLogMessages'

export default class MessageHandler {
    constructor () {
        MQTTBroker.getMessage((topic: TopicCodes, message: string) => {
            switch (topic) {
                case 'PING':
                    console.log(topic, '-', message)
                    break
                case TopicCodes.USER_LOG:
                    UserLog.saveLog(message)
                    break
                default:
                    break
            }
        })
    }
}
