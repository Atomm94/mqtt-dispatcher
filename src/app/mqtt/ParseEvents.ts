import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
// import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
// import { acuConnectionType } from '../enums/acuConnectionType.enum'
// import { accessPointType } from '../enums/accessPointType.enum'
// import { scheduleType } from '../enums/scheduleType.enum'
// import { credentialStatus } from '../enums/credentialStatus.enum'
import { handleCallback } from './ParseAcu'

export default class ParseEvents {
    public static setEventsMod (message: ICrudMqttMessaging): void {
        // console.log('SetEventsMod', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_EVENTS_MOD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('SetEventsMod send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getEventsMod (message: ICrudMqttMessaging): void {
        // console.log('GetEventsMod', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_EVENTS_MOD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('GetEventsMod send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getEvents (message: ICrudMqttMessaging): void {
        // console.log('GetEvents', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_EVENTS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('GetEvents send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }
}
