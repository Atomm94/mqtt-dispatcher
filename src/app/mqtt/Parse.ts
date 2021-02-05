import MQTTBroker from './mqtt'
import { SendTopics } from './Topics'
import { OperatorType } from './Operators'

export default class Parse {
    public static deviceData (topic: string, data: any): void {
        switch (data.operator) {
            case OperatorType.REGISTRATION:
                this.deviceRegistration(topic, data)
                break
            case OperatorType.ACCEPT_ACK:
                this.deviceAcceptAck(data)
                break
            default:
                break
        }
    }

    public static crudData (topic: string, data: any): void {
        switch (data.operator) {
            case OperatorType.ACCEPT:
                this.deviceAccept(data)
                break
            default:
                break
        }
    }

    public static deviceRegistration (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceAccept (data: any): void {
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.ACCEPT,
            session_id: '0',
            message_id: '0',
            info: 'none'
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static deviceAcceptAck (data: any): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static companyTopics (msg_data: any, topic: string): void {
        console.log('companyTopics', topic)
        const new_topics = [
            `${msg_data.location}/Registration/Events`
        ]
        for (const new_topic of new_topics) {
            console.log('new_topic', new_topic)

            // if (topic === ReceiveTopics.SUB_TOPIC) {
            //     MQTTBroker.subscribe(new_topic)
            // } else {
            //     MQTTBroker.unsubscribe(new_topic)
            // }
        }
    }

    public static deviceTopics (topic: string, msg_data: any): void {
        console.log('deviceTopics', topic)
        console.log('msg_data', msg_data)
        // if (!msg_data.location || msg_data.location) {
        //     console.log('deviceTopics invalid data', topic)
        // }
        // const new_topics = [
        //     `${msg_data.location}/Operate/${msg_data.device_id}`,
        //     `${msg_data.location}/Operate/${msg_data.device_id}/Ack`,
        //     `${msg_data.location}/Registration/${msg_data.device_id}/Operate`,
        //     `${msg_data.location}/Registration/${msg_data.device_id}/Operate/Ack`
        // ]
        MQTTBroker.publishMessage(`${msg_data.location}/RegistrationCrud/${msg_data.device_id}`, msg_data)

        // for (const new_topic of new_topics) {
        //     console.log('new_topic', new_topic)

        //     if (topic === TopicCodes.SUB_TOPIC) {
        //         MQTTBroker.subscribe(new_topic)
        //     } else {
        //         MQTTBroker.unsubscribe(new_topic)
        //     }
        // }
    }
}
