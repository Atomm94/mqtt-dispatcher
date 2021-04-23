import MQTTBroker from '../mqtt/mqtt'
import { SendTopics } from '../mqtt/Topics'

export default async function sendSocket (data: any) {
    MQTTBroker.publishMessage(SendTopics.MQTT_SOCKET, JSON.stringify(data))
}
