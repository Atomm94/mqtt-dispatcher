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
            case OperatorType.SET_EVENTS_MOD:
                this.setEventsMod(data)
                break
            case OperatorType.GET_EVENTS_MOD:
                this.getEventsMod(data)
                break
            case OperatorType.EVENT:
                this.event(data)
                break
            case OperatorType.GET_EVENTS:
                this.getEvents(data)
                break
            case OperatorType.SET_ACCESS_MODE:
                this.setAccessMode(data)
                break
            case OperatorType.GET_ACCESS_MODE:
                this.getAccessMode(data)
                break
            case OperatorType.SINGLE_PASS:
                this.single_pass(data)
                break
            case OperatorType.SET_CARD_KEYS:
                this.setCardKeys(data)
                break
            case OperatorType.ADD_CARD_KEY:
                this.addCardKey(data)
                break
            case OperatorType.EDIT_KEY:
                this.editKey(data)
                break
            case OperatorType.DELL_KEYS:
                this.dellKeys(data)
                break
            case OperatorType.DELL_ALL_KEYS:
                this.dellAllKeys(data)
                break
            case OperatorType.SET_SDL_DAILY:
                this.setSdlDaily(data)
                break
            case OperatorType.SET_SDL_WEEKLY:
                this.setSdlWeekly(data)
                break
            case OperatorType.SET_SDL_FLEXI_TIME:
                this.setSdlFlexiTime(data)
                break
            case OperatorType.ADD_DAY_FLEXI_TIME:
                this.addDayFlexiTime(data)
                break
            case OperatorType.END_SDL_FLEXI_TIME:
                this.endSdlFlexiTime(data)
                break
            case OperatorType.DEL_DAY_FLEXI_TIME:
                this.delDayFlexiTime(data)
                break
            case OperatorType.SET_SDL_SPECIFIED:
                this.setSdlSpecified(data)
                break
            case OperatorType.ADD_DAY_SPECIFIED:
                this.addDaySpecified(data)
                break
            case OperatorType.END_SDL_SPECIFIED:
                this.endSdlSpecified(data)
                break
            case OperatorType.DELL_SHEDULE:
                this.dellShedule(data)
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

        const topic = `${data.location}/registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.LOGIN,
            session_Id: '0',
            message_Id: `${data.message_id}`,
            info: data.info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
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

    public static setEventsMod (data: any): void {
        // console.log('SetEventsMod', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_EVENTS_MOD,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetEventsMod send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getEventsMod (data: any): void {
        // console.log('GetEventsMod', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_EVENTS_MOD,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('GetEventsMod send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static event (data: any): void {
        // console.log('Event', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.EVENT,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('Event send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getEvents (data: any): void {
        // console.log('GetEvents', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_EVENTS,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('GetEvents send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setAccessMode (data: any): void {
        // console.log('SetAccessMode', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_ACCESS_MODE,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetAccessMode send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getAccessMode (data: any): void {
        // console.log('GetAccessMode', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_ACCESS_MODE,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('GetAccessMode send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static single_pass (data: any): void {
        // console.log('Single_pass', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SINGLE_PASS,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('Single_pass send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setCardKeys (data: any): void {
        // console.log('SetCardKeys', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_CARD_KEYS,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetCardKeys send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static addCardKey (data: any): void {
        // console.log('AddCardKey', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.ADD_CARD_KEY,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('AddCardKey send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static editKey (data: any): void {
        // console.log('EditKey', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.EDIT_KEY,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('EditKey send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static dellKeys (data: any): void {
        // console.log('DellKeys', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.DELL_KEYS,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('DellKeys send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static dellAllKeys (data: any): void {
        // console.log('DellAllKeys', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.DELL_ALL_KEYS,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('DellAllKeys send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setSdlDaily (data: any): void {
        // console.log('SetSdlDaily', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_SDL_DAILY,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetSdlDaily send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setSdlWeekly (data: any): void {
        // console.log('SetSdlWeekly', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_SDL_WEEKLY,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetSdlWeekly send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setSdlFlexiTime (data: any): void {
        // console.log('SetSdlFlexiTime', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_SDL_FLEXI_TIME,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetSdlFlexiTime send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static addDayFlexiTime (data: any): void {
        // console.log('AddDayFlexiTime', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.ADD_DAY_FLEXI_TIME,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('AddDayFlexiTime send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static endSdlFlexiTime (data: any): void {
        // console.log('EndSdlFlexiTime', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.END_SDL_FLEXI_TIME,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('EndSdlFlexiTime send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static delDayFlexiTime (data: any): void {
        // console.log('DelDayFlexiTime', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.DEL_DAY_FLEXI_TIME,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('DelDayFlexiTime send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setSdlSpecified (data: any): void {
        // console.log('SetSdlSpecified', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_SDL_SPECIFIED,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('SetSdlSpecified send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static addDaySpecified (data: any): void {
        // console.log('AddDaySpecified', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.ADD_DAY_SPECIFIED,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('AddDaySpecified send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static endSdlSpecified (data: any): void {
        // console.log('EndSdlSpecified', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.END_SDL_SPECIFIED,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('EndSdlSpecified send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static dellShedule (data: any): void {
        // console.log('DellShedule', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.DELL_SHEDULE,
            session_id: data.session_id,
            message_id: '222222222222',
            info:
            {

            }
        }
        console.log('DellShedule send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }
}
function handleCallback (send_topic: any, send_data: any): any {
    send_data = JSON.parse(send_data)
    console.log('send_data', send_data)

    // setTimeout(() => {
    //     MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    function cb (topic: any, message: any) {
        try {
            console.log('topic', topic, typeof message)
            console.log('message', message)
            message = JSON.parse(message.toString())
            if (topic === `${send_topic}/Ack` && send_data.message_id === message.message_id) {
                MQTTBroker.client.removeListener('message', cb)
            }
        } catch (e) {

        }
    }
    return cb

    // if (topicAck === `${topic}/Ack` && send_data.message_id === message.message_id) {
    //     // console.log('00000000000000', topic, message)
    //     MQTTBroker.client.removeListener('message', handleCallback)
    // }
    // return callBack([...arguments])
}
// function callBack () {
//     console.log(arguments)

//     // if (topicAck === `${topic}/Ack` && send_data.message_id === message.message_id) {
//     //     // console.log('00000000000000', topic, message)
//     //     MQTTBroker.client.removeListener('message', handleCallback)
//     // }
// }
