import MQTTBroker from '../mqtt/mqtt'
import { OperatorType } from '../mqtt/Operators'
import { SendTopics } from '../mqtt/Topics'

export default class LogMessageHandler {
    public static async parseLog (message: any) {
        switch (message.operator) {
            case OperatorType.EVENT_LOG:
                this.saveEventLog(message)
                break
            case OperatorType.USER_LOG:
                this.saveUserLog(message)
                break
            default:
                break
        }
    }

    public static async saveEventLog (message: any) {
        MQTTBroker.publishMessage(SendTopics.MQTT_LOG, JSON.stringify(message))
        /* send to socket server */
        // message.operator = OperatorType.NOTIFICATION
        // message.channel = OperatorType.NOTIFICATION
        // MQTTBroker.publishMessage(SendTopics.MQTT_SOCKET, JSON.stringify(message))
    }

    public static async saveUserLog (message: any) {
        MQTTBroker.publishMessage(SendTopics.MQTT_LOG, JSON.stringify(message))
    }
}
