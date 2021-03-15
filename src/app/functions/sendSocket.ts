import MQTTBroker from '../mqtt/mqtt'
import { OperatorType } from '../mqtt/Operators'

export default async function sendSocket (data: any) {
    MQTTBroker.publishMessage(OperatorType.NOTIFICATION, JSON.stringify(data))
}
