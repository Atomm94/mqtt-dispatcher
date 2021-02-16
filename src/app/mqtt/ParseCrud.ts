import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'

export default class ParseCrud {
    public static crudData (topic: string, data: any): void {
        switch (data.operator) {
            case OperatorType.ACCEPT:
                this.accept(data)
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
                this.setNetSettings(data)
                break
            case OperatorType.GET_NET_SETTINGS:
                this.getNetSettings(data)
                break
            case OperatorType.SET_DATE_TIME:
                this.setDateTime(data)
                break
            case OperatorType.SET_MQTT_SETTINGS:
                this.setMqttSettings(data)
                break
            case OperatorType.GET_MQTT_SETTINGS:
                this.getMqttSettings(data)
                break
            case OperatorType.GET_STATUS_ACU:
                this.getStatusAcu(data)
                break
            case OperatorType.SET_EXT_BRD:
                this.setExtBrd(data)
                break
            case OperatorType.GET_EXT_BRD:
                this.getExtBrd(data)
                break
            case OperatorType.SET_RD:
                this.setRd(data)
                break
            case OperatorType.GET_RD:
                this.getRd(data)
                break
            case OperatorType.SET_OUTPUT:
                this.setOutput(data)
                break
            case OperatorType.GET_OUTPUT:
                this.getOutput(data)
                break
            case OperatorType.GET_INPUT:
                this.getInput(data)
                break
            case OperatorType.CARD_PROTECTION:
                this.cardProtection(data)
                break
            case OperatorType.SET_CTP_DOOR:
                this.setCtpDoor(data)
                break
            case OperatorType.SET_EVENTS_MOD:
                this.setEventsMod(data)
                break
            case OperatorType.GET_EVENTS_MOD:
                this.getEventsMod(data)
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
            case OperatorType.DEV_TEST:
                this.devTest(data)
                break

            default:
                break
        }
    }

    public static accept (data: any): void {
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.ACCEPT,
            session_id: '0',
            message_id: '0',
            info: 'none'
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
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
            info: data.info
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
            info: data.info
        }
        console.log('setpasss send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setNetSettings (data: any): void {
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            sessionId: data.session_id,
            messageId: data.message_id,
            info: data.info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getNetSettings (data: any): void {
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
            info: data.info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setDateTime (data: any): void {
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
            info: data.info
            // info:
            // {
            //     DateTime: ~~(Date.now() / 1000),
            //     GMT: data.gmt
            // }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setMqttSettings (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_MQTT_SETTINGS,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
        }

        console.log('deviceSetMqttSettings send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getMqttSettings (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_MQTT_SETTINGS,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
        }

        console.log('deviceGetMqttSettings send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getStatusAcu (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_STATUS_ACU,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
        }

        console.log('deviceGetStatusAcu send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setExtBrd (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_EXT_BRD,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
        }

        console.log('deviceSetExtBrd send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getExtBrd (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_EXT_BRD,
            session_id: data.session_id,
            message_id: '222222222222',
            info: {
                Brd_idx: 1
            }
        }

        console.log('deviceGetExtBrd send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setRd (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_RD,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceSetRd send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getRd (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_RD,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceGetRd send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setOutput (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_OUTPUT,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceSetOutput send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getOutput (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_OUTPUT,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceSetOutput send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getInput (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_INPUT,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceSetOutput send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static cardProtection (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.CARD_PROTECTION,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceCardProtection send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setCtpDoor (data: any): void {
        // console.log('deviceSetMqttSettings', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_CTP_DOOR,
            session_id: data.session_id,
            message_id: data.message_id,
            info: data.info
        }

        console.log('deviceSetCtpDoor send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setEventsMod (data: any): void {
        // console.log('SetEventsMod', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.SET_EVENTS_MOD,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
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
            info: data.info
        }
        console.log('GetEventsMod send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getEvents (data: any): void {
        // console.log('GetEvents', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.GET_EVENTS,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
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
            info: data.info
        }
        console.log('DellShedule send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static devTest (data: any): void {
        // console.log('DellShedule', data)
        const topic = `${data.location}/Registration/${data.device_id}/Operate`
        const send_data = {
            operator: OperatorType.DEV_TEST,
            session_id: data.session_id,
            message_id: '222222222222',
            info: data.info
        }
        console.log('DellShedule send data', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }
}
