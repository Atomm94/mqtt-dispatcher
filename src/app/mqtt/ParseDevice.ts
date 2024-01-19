import MQTTBroker from './mqtt'
import { SendTopics } from './Topics'
import { OperatorType } from './Operators'
import { IDeviceMqttMessaging, IMqttCrudMessaging } from '../interfaces/messaging.interface'

export default class ParseDevice {
    public static deviceData (topic: string, data: IDeviceMqttMessaging): void {
        const send_crud: IMqttCrudMessaging = { ...data, device_topic: topic }
        switch (data.operator) {
            case OperatorType.REGISTRATION:
                this.deviceRegistration(send_crud)
                break
            case OperatorType.LOGOUT_EVENT:
                this.deviceLogOutEvent(send_crud)
                break
            case OperatorType.EVENT:
                this.deviceEvent(send_crud)
                break
            case OperatorType.HEART_BIT:
                this.deviceHeartBit(send_crud)
                break
            // case OperatorType.ACCEPT_ACK:
            //     this.deviceAcceptAck(topic, data)
            //     break
            // case OperatorType.LOGIN_ACK:
            //     this.deviceLoginAck(topic, data)
            //     break
            // case OperatorType.LOGOUT_ACK:
            //     this.deviceLogOutAck(topic, data)
            //     break

            // case OperatorType.SET_PASS_ACK:
            //     this.deviceSetPassAck(topic, data)
            //     break
            // case OperatorType.SET_NET_SETTINGS_ACK:
            //     this.deviceSetNetSettingsAck(topic, data)
            //     break
            // case OperatorType.GET_NET_SETTINGS_ACK:
            //     this.deviceGetNetSettingsAck(topic, data)
            //     break
            // case OperatorType.SET_DATE_TIME_ACK:
            //     this.deviceSetDateTimeAck(topic, data)
            //     break
            // case OperatorType.SET_MQTT_SETTINGS_ACK:
            //     this.deviceSetMqttSettingsAck(topic, data)
            //     break
            // case OperatorType.GET_MQTT_SETTINGS_ACK:
            //     this.deviceGetMqttSettingsAck(topic, data)
            //     break
            // case OperatorType.GET_STATUS_ACU_ACK:
            //     this.deviceGetStatusAcuAck(topic, data)
            //     break
            // case OperatorType.SET_EXT_BRD_ACK:
            //     this.deviceSetExtBrdAck(topic, data)
            //     break
            // case OperatorType.GET_EXT_BRD_ACK:
            //     this.deviceGetExtBrdAck(topic, data)
            //     break
            // case OperatorType.SET_RD_ACK:
            //     this.deviceSetRdAck(topic, data)
            //     break
            // case OperatorType.GET_RD_ACK:
            //     this.deviceGetRdAck(topic, data)
            //     break
            // case OperatorType.GET_OUTPUT_ACK:
            //     this.deviceGetOutputAck(topic, data)
            //     break
            // case OperatorType.SET_OUTPUT_ACK:
            //     this.deviceSetOutputAck(topic, data)
            //     break
            // case OperatorType.GET_INPUT_ACK:
            //     this.deviceGetInputAck(topic, data)
            //     break
            // case OperatorType.SET_CTP_DOOR_ACK:
            //     this.deviceSetCtpDoorAck(topic, data)
            //     break
            // case OperatorType.SET_EVENTS_MOD_ACK:
            //     this.deviceSetEventsModAck(topic, data)
            //     break
            // case OperatorType.GET_EVENTS_MOD_ACK:
            //     this.deviceGetEventsModAck(topic, data)
            //     break
            // case OperatorType.GET_EVENTS_ACK:
            //     this.deviceGetEventsAck(topic, data)
            //     break
            // case OperatorType.SET_ACCESS_MODE_ACK:
            //     this.deviceSetAccessModeAck(topic, data)
            //     break
            // case OperatorType.GET_ACCESS_MODE_ACK:
            //     this.deviceGetAccessModeAck(topic, data)
            //     break
            // case OperatorType.SINGLE_PASS_ACK:
            //     this.deviceSinglePassAck(topic, data)
            //     break
            // case OperatorType.SET_CARD_KEYS_ACK:
            //     this.setCardKeysAck(send_crud)
            //     break
            // case OperatorType.ADD_CARD_KEY_ACK:
            //     this.addCardKeyAck(send_crud)
            //     break
            // case OperatorType.EDIT_KEY_ACK:
            //     this.editKeyAck(send_crud)
            //     break
            // case OperatorType.DELL_KEYS_ACK:
            //     this.dellKeysAck(send_crud)
            //     break
            // case OperatorType.DELL_ALL_KEYS_ACK:
            //     this.dellAllKeysAck(send_crud)
            //     break
            // case OperatorType.SET_SDL_DAILY_ACK:
            //     this.setSdlDailyAck(topic, data)
            //     break
            // case OperatorType.SET_SDL_WEEKLY_ACK:
            //     this.setSdlWeeklyAck(topic, data)
            //     break
            // case OperatorType.SET_SDL_FLEXI_TIME_ACK:
            //     this.setSdlFlexiTimeAck(topic, data)
            //     break
            // case OperatorType.ADD_DAY_FLEXI_TIME_ACK:
            //     this.addDayFlexiTimeAck(topic, data)
            //     break
            // case OperatorType.END_SDL_FLEXI_TIME_ACK:
            //     this.endSdlFlexiTimeAck(topic, data)
            //     break
            // case OperatorType.DEL_DAY_FLEXI_TIME_ACK:
            //     this.delDayFlexiTimeAck(topic, data)
            //     break
            // case OperatorType.SET_SDL_SPECIFIED_ACK:
            //     this.setSdlSpecifiedAck(topic, data)
            //     break
            // case OperatorType.ADD_DAY_SPECIFIED_ACK:
            //     this.addDaySpecifiedAck(topic, data)
            //     break
            // case OperatorType.END_SDL_SPECIFIED_ACK:
            //     this.endSdlSpecifiedAck(topic, data)
            //     break
            // case OperatorType.DELL_DAY_SPECIFIED_ACK:
            //     this.dellDaySpecifiedAck(topic, data)
            //     break
            // case OperatorType.DELL_SHEDULE_ACK:
            //     this.dellSheduleAck(topic, data)
            //     break
            // case OperatorType.DEV_TEST_ACK:
            //     this.deviceDevTestAck(topic, data)
            //     break

            default:
                break
        }
    }

    public static deviceRegistration (data: IMqttCrudMessaging): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceAcceptAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceLoginAck (topic: string, data: any): void {
        data.topic = topic
        // console.log('datalogin', data)

        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceLogOutAck (topic: string, data: any): void {
        data.topic = topic
        // console.log('datalogout', data)

        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceLogOutEvent (data: IMqttCrudMessaging): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetPassAck (topic: string, data: any): void {
        data.topic = topic
        // console.log('deviceSetPassAck', data)

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

    public static deviceSetOutputAck (topic: string, data: any): void {
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

    public static deviceEvent (data: IMqttCrudMessaging): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceHeartBit (data: IMqttCrudMessaging): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceSetEventsModAck (topic: string, data: any): void {
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

    public static deviceSetAccessModeAck (topic: string, data: any): void {
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

    public static setCardKeysAck (data: any): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static addCardKeyAck (data: any): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static editKeyAck (data: any): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static dellKeysAck (data: any): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static dellAllKeysAck (data: any): void {
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static setSdlDailyAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static setSdlWeeklyAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static setSdlFlexiTimeAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static addDayFlexiTimeAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static endSdlFlexiTimeAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static delDayFlexiTimeAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static setSdlSpecifiedAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static addDaySpecifiedAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static endSdlSpecifiedAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static dellDaySpecifiedAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static dellSheduleAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }

    public static deviceDevTestAck (topic: string, data: any): void {
        data.topic = topic
        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(data))
    }
}
