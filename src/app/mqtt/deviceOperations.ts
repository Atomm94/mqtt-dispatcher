import MQTTBroker from '../mqtt/mqtt'
import { TopicCodes } from './Topics'

export default class deviceOperations {
    public static registration (msg_data: any, topic: string): void {
        const new_topics = [
            `${msg_data.location}/Registration/Events`,
            // `${msg_data.location}/Operate/${msg_data.device_id}`,
            `${msg_data.location}/Operate/${msg_data.device_id}/Ack`
        ]

        for (const new_topic of new_topics) {
            if (topic === TopicCodes.SUB_TOPIC) {
                MQTTBroker.subscribe(new_topic)
            } else {
                MQTTBroker.unsubscribe(new_topic)
            }
        }
    }
}
