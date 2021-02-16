import MQTTBroker from './mqtt'
import { SendTopics } from './Topics'
import { OperatorType } from './Operators'

export default class ParseDevice {
    public static deviceData (topic: string, data: any): void {
        switch (data.operator) {
            case OperatorType.REGISTRATION:
                this.deviceRegistration(topic, data)
                break
            case OperatorType.ACCEPT_ACK:
                this.deviceAcceptAck(topic, data)
                break
            case OperatorType.LOGIN_ACK:
                this.deviceLoginAck(topic, data)
                break
            case OperatorType.LOGOUT_ACK:
                this.deviceLogOutAck(topic, data)
                break
            case OperatorType.LOGOUT_EVENT:
                this.deviceLogOutEvent(topic, data)
                break
            case OperatorType.SET_PASS_ACK:
                this.deviceSetPassAck(topic, data)
                break
            case OperatorType.SET_NET_SETTINGS_ACK:
                this.deviceSetNetSettingsAck(topic, data)
                break
            case OperatorType.GET_NET_SETTINGS_ACK:
                this.deviceGetNetSettingsAck(topic, data)
                break
            case OperatorType.SET_DATE_TIME_ACK:
                this.deviceSetDateTimeAck(topic, data)
                break
            case OperatorType.SET_MQTT_SETTINGS_ACK:
                this.deviceSetMqttSettingsAck(topic, data)
                break
            case OperatorType.GET_MQTT_SETTINGS_ACK:
                this.deviceGetMqttSettingsAck(topic, data)
                break
            case OperatorType.GET_STATUS_ACU_ACK:
                this.deviceGetStatusAcuAck(topic, data)
                break
            case OperatorType.SET_EXT_BRD_ACK:
                this.deviceSetExtBrdAck(topic, data)
                break
            case OperatorType.GET_EXT_BRD_ACK:
                this.deviceGetExtBrdAck(topic, data)
                break
            case OperatorType.SET_RD_ACK:
                this.deviceSetRdAck(topic, data)
                break
            case OperatorType.GET_RD_ACK:
                this.deviceGetRdAck(topic, data)
                break
            case OperatorType.GET_OUTPUT_ACK:
                this.deviceGetOutputAck(topic, data)
                break
            case OperatorType.GET_INPUT_ACK:
                this.deviceGetInputAck(topic, data)
                break
            case OperatorType.SET_CTP_DOOR_ACK:
                this.deviceSetCtpDoorAck(topic, data)
                break
            case OperatorType.EVENT:
                this.deviceEvent(topic, data)
                break
            case OperatorType.GET_EVENTS_MOD_ACK:
                this.deviceGetEventsModAck(topic, data)
                break
            case OperatorType.GET_EVENTS_ACK:
                this.deviceGetEventsAck(topic, data)
                break
            case OperatorType.GET_ACCESS_MODE_ACK:
                this.deviceGetAccessModeAck(topic, data)
                break
            case OperatorType.SINGLE_PASS_ACK:
                this.deviceSinglePassAck(topic, data)
                break
            case OperatorType.DEV_TEST_ACK:
                this.deviceDevTestAck(topic, data)
                break

            default:
                break
        }
    }

    public static deviceRegistration (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceAcceptAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceLoginAck (topic: string, data: any): void {
        data.topic = topic
        console.log('datalogin', data)

        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceLogOutAck (topic: string, data: any): void {
        data.topic = topic
        console.log('datalogout', data)

        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceLogOutEvent (topic: string, data: any): void {
        data.topic = topic
        console.log('deviceLogOutEvent', data)

        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetPassAck (topic: string, data: any): void {
        data.topic = topic
        console.log('deviceSetPassAck', data)

        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetNetSettingsAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetNetSettingsAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetDateTimeAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetMqttSettingsAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetMqttSettingsAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetStatusAcuAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetExtBrdAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetExtBrdAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetRdAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetRdAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetOutputAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetInputAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetCtpDoorAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceEvent (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetEventsModAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetEventsAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceGetAccessModeAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSinglePassAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceDevTestAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }
}
