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
            default:
                break
        }
    }

    public static crudData (topic: string, data: any): void {
        switch (data.operator) {
            case OperatorType.ACCEPT:
                this.deviceAccept(data)
                break
            case OperatorType.LOGIN:
                this.login(data)
                break
            case OperatorType.LOGOUT:
                this.logOut(data)
                break
            case OperatorType.SET_PASS:
                this.setPass(data)
                break
            case OperatorType.SET_NET_SETTINGS:
                this.deviceSetNetSettings(data)
                break
            case OperatorType.GET_NET_SETTINGS:
                this.deviceGetNetSettings(data)
                break
            case OperatorType.SET_DATE_TIME:
                this.deviceSetDateTime(data)
                break
            case OperatorType.SET_MQTT_SETTINGS:
                this.deviceSetMqttSettings(data)
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

    public static login (data: any): void {
        console.log('login', data)

        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.LOGIN,
            session_id: '0',
            message_id: '1111111111',
            info:
            {
                username: data.username,
                password: data.password
            }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static logOut (data: any): void {
        // console.log('logOut', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.LOGOUT,
            session_Id: 2222222222,
            message_Id: 1111111111,
            info: 'none'
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setPass (data: any): void {
        // console.log('setPass', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_PASS,
            session_id: data.session_id,
            message_id: 1111111111,
            info:
            {
                username: data.username,
                password: data.password
            }
        }
        console.log('setpasss send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static deviceSetNetSettings (data: any): void {
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            sessionId: data.session_id,
            messageId: data.message_id,
            info: data.info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static deviceGetNetSettings (data: any): void {
        // send data to device
        // {
        //     "operator": "GetNetSettings",
        //     "session_Id": "1111111111",
        //     "message_Id": "222222222222",
        //     "info":"none"
        // }

        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            sessionId: data.session_id,
            messageId: data.message_id,
            info: 'none'
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static deviceSetDateTime (data: any): void {
        // data from crud
        // {
        //     operator: 'SetDateTime',
        //     location: '1215/151',
        //     device_id: '123456',
        //     session_id: '11111111',
        //     message_id: '11111111',
        //     gmt: 4
        // }
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            sessionId: data.session_id,
            messageId: data.message_id,
            info:
            {
                DateTime: ~~(Date.now() / 1000),
                GMT: data.gmt
            }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static deviceSetMqttSettings (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_MQTT_SETTINGS,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {
                BrokerAdr: 'lumiring.msg.th',
                BrokerPort: 3285,
                ClientID: '101FRE1111325665454RETV123355',
                Use_SSL: false,
                User_Name: 'TR2584567452121TFD',
                User_Pass: 'ASTR565VFDF8787fdtrtJ76p',
                Location: `${data.location}/main_perimeter_group`,
                DeviceID: data.device_id,
                'use_ enryption': false
            }
        }

        console.log('deviceSetMqttSettings send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }
}
