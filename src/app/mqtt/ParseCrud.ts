import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
import { acuConnectionType } from '../enums/acuConnectionType.enum'

export default class ParseCrud {
    public static crudData (topic: string, message: ICrudMqttMessaging): void {
        switch (message.operator) {
            case OperatorType.ACCEPT:
                this.accept(message)
                break
            case OperatorType.LOGIN:
                this.login(message)
                break
            case OperatorType.LOGOUT:
                this.logOut(message)
                break
            case OperatorType.SET_PASS:
                this.setPass(message)
                break
            case OperatorType.SET_NET_SETTINGS:
                this.setNetSettings(message)
                break
            case OperatorType.GET_NET_SETTINGS:
                this.getNetSettings(message)
                break
            case OperatorType.SET_DATE_TIME:
                this.setDateTime(message)
                break
            case OperatorType.SET_MQTT_SETTINGS:
                this.setMqttSettings(message)
                break
            case OperatorType.GET_MQTT_SETTINGS:
                this.getMqttSettings(message)
                break
            case OperatorType.GET_STATUS_ACU:
                this.getStatusAcu(message)
                break
            case OperatorType.SET_EXT_BRD:
                this.setExtBrd(message)
                break
            case OperatorType.GET_EXT_BRD:
                this.getExtBrd(message)
                break
            case OperatorType.SET_RD:
                this.setRd(message)
                break
            case OperatorType.GET_RD:
                this.getRd(message)
                break
            case OperatorType.SET_OUTPUT:
                this.setOutput(message)
                break
            case OperatorType.GET_OUTPUT:
                this.getOutput(message)
                break
            case OperatorType.GET_INPUT:
                this.getInput(message)
                break
            case OperatorType.CARD_PROTECTION:
                this.cardProtection(message)
                break
            case OperatorType.SET_CTP_DOOR:
                this.setCtpDoor(message)
                break
            case OperatorType.DEL_CTP_DOOR:
                this.delCtpDoor(message)
                break
            case OperatorType.SET_EVENTS_MOD:
                this.setEventsMod(message)
                break
            case OperatorType.GET_EVENTS_MOD:
                this.getEventsMod(message)
                break
            case OperatorType.GET_EVENTS:
                this.getEvents(message)
                break
            case OperatorType.SET_ACCESS_MODE:
                this.setAccessMode(message)
                break
            case OperatorType.GET_ACCESS_MODE:
                this.getAccessMode(message)
                break
            case OperatorType.SINGLE_PASS:
                this.single_pass(message)
                break
            case OperatorType.SET_CARD_KEYS:
                this.setCardKeys(message)
                break
            case OperatorType.ADD_CARD_KEY:
                this.addCardKey(message)
                break
            case OperatorType.EDIT_KEY:
                this.editKey(message)
                break
            case OperatorType.DELL_KEYS:
                this.dellKeys(message)
                break
            case OperatorType.DELL_ALL_KEYS:
                this.dellAllKeys(message)
                break
            case OperatorType.SET_SDL_DAILY:
                this.setSdlDaily(message)
                break
            case OperatorType.DEL_SDL_DAILY:
                this.delSdlDaily(message)
                break
            case OperatorType.SET_SDL_WEEKLY:
                this.setSdlWeekly(message)
                break
            case OperatorType.DEL_SDL_WEEKLY:
                this.delSdlWeekly(message)
                break
            case OperatorType.SET_SDL_FLEXI_TIME:
                this.setSdlFlexiTime(message)
                break
            case OperatorType.ADD_DAY_FLEXI_TIME:
                this.addDayFlexiTime(message)
                break
            case OperatorType.END_SDL_FLEXI_TIME:
                this.endSdlFlexiTime(message)
                break
            case OperatorType.DEL_SDL_FLEXI_TIME:
                this.delSdlFlexiTime(message)
                break
            case OperatorType.DEL_DAY_FLEXI_TIME:
                this.delDayFlexiTime(message)
                break
            case OperatorType.SET_SDL_SPECIFIED:
                this.setSdlSpecified(message)
                break
            case OperatorType.ADD_DAY_SPECIFIED:
                this.addDaySpecified(message)
                break
            case OperatorType.END_SDL_SPECIFIED:
                this.endSdlSpecified(message)
                break
            case OperatorType.DEL_SDL_SPECIFIED:
                this.delSdlSpecified(message)
                break
            case OperatorType.DELL_DAY_SPECIFIED:
                this.dellDaySpecified(message)
                break
            case OperatorType.DELL_SHEDULE:
                this.dellShedule(message)
                break
            case OperatorType.DEV_TEST:
                this.devTest(message)
                break

            default:
                break
        }
    }

    public static accept (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const send_data = {
            operator: OperatorType.ACCEPT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static login (message: ICrudMqttMessaging): void {
        console.log('login', message)
        const send_data = {
            operator: OperatorType.LOGIN,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(message.topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static logOut (message: any): void {
        // console.log('logOut', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.LOGOUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setPass (message: ICrudMqttMessaging): void {
        // console.log('setPass', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_PASS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        console.log('setpasss send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setNetSettings (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                connection_type: (message.data.connection_type === acuConnectionType.WI_FI) ? 0 : 1,
                connection_mod: (message.data.dhcp) ? 0 : 1,
                // SSID: 'Office242',
                // Pass: '12346789',
                ip_address: message.data.ip_address,
                mask: message.data.subnet_mask,
                Gate: message.data.gateway,
                DNS1: message.data.dns_server
                // DNS2: '8.8.8.8',
                // AP_SSID: 'LmWf123456789',
                // AP_PASS: '123456',
                // HideSSID: false,
                // time_ap_on: 80,
                // MAC_Wr: 'none',
                // MAC_Eth: 'none'
            }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getNetSettings (message: any): void {
        // send message to device
        // {
        //     "operator": "GetNetSettings",
        //     "session_Id": "1111111111",
        //     "message_Id": "222222222222",
        //     "info":"none"
        // }

        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setDateTime (message: ICrudMqttMessaging): void {
        // message from crud
        // {
        //     operator: 'SetDateTime',
        //     location: '1215/151',
        //     device_id: '123456',
        //     session_id: '11111111',
        //     message_id: '11111111',
        //     gmt: 4
        // }
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                DateTime: 1583636400,
                GMT: message.data.time_zone,
                NTP1: 'pool.ntp.org',
                NTP2: 'pool2.ntp.org:123',
                DST_GMT: false,
                DST_Start: 1583636400,
                DST_End: 1604196000,
                DST_Shift: 3600
            }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setMqttSettings (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_MQTT_SETTINGS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceSetMqttSettings send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getMqttSettings (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_MQTT_SETTINGS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceGetMqttSettings send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getStatusAcu (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_STATUS_ACU,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setExtBrd (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_EXT_BRD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceSetExtBrd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getExtBrd (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_EXT_BRD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceGetExtBrd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setRd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        console.log('deviceSetRd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getRd (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceGetRd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setOutput (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_OUTPUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceSetOutput send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getOutput (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_OUTPUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceSetOutput send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getInput (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_INPUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceSetOutput send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static cardProtection (message: any): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.CARD_PROTECTION,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }

        console.log('deviceCardProtection send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setCtpDoor (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_CTP_DOOR,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
                // Control_point_gId: '12548789522',
                // Leaving_Zone: 'Hall',
                // Came_To_Zone: 'Meeting room',
                // Ctp_Apb_Group: 'Meeting room/ABP',
                // Control_type: 1,
                // APB_Wrk_type: 0,
                // APB_Mode: -1,
                // APB_Time: 0,
                // Work_Mode: 0,
                // Door_Allarm: 1,
                // Door_Allarm_Tm: 1500,
                // Door_Delay: 6,
                // Door_Lock_mode: 0,
                // Door_Lock_type: 1,
                // Door_Lock_pulse: 500,
                // Lock_Relay_opt: 0,
                // Lock_Relay_idx: 0,
                // Alarm_out_opt: 0,
                // Alarm_out_idx: 2,
                // Button_rex_opt: 0,
                // Button_rex_idx: 0,
                // Button_rex_sens: 20,
                // Door_sens_opt: 0,
                // Door_sens_idx: 1,
                // Rex_release_tm: 255,
                // Alarm_In_opt: 0,
                // Alarm_In_idx: 1,
                // Acc_mod: 0,
                // Ctp_auto_mod: -1,
                // Shedul_auto_mod: 'none',
                // Owner_mod: -1,
                // Owner_keys: 'none',
                // Rd0_idx: 0,
                // Rd0_dir: 1,
                // Rd1_idx: 1,
                // Rd1_dir: 0,
                // Rd2_idx: -1,
                // Rd2_dir: -1,
                // Rd3_idx: -1,
                // Rd3_dir: -1
            }
        }

        console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static delCtpDoor (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_CTP_DOOR,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setEventsMod (message: any): void {
        // console.log('SetEventsMod', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_EVENTS_MOD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('SetEventsMod send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getEventsMod (message: any): void {
        // console.log('GetEventsMod', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_EVENTS_MOD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('GetEventsMod send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getEvents (message: any): void {
        // console.log('GetEvents', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_EVENTS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('GetEvents send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setAccessMode (message: any): void {
        // console.log('SetAccessMode', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_ACCESS_MODE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('SetAccessMode send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static getAccessMode (message: any): void {
        // console.log('GetAccessMode', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.GET_ACCESS_MODE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('GetAccessMode send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static single_pass (message: any): void {
        // console.log('Single_pass', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SINGLE_PASS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('Single_pass send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setCardKeys (message: any): void {
        // console.log('SetCardKeys', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.SET_CARD_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('SetCardKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static addCardKey (message: any): void {
        // console.log('AddCardKey', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.ADD_CARD_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('AddCardKey send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static editKey (message: any): void {
        // console.log('EditKey', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.EDIT_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('EditKey send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static dellKeys (message: any): void {
        // console.log('DellKeys', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.DELL_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('DellKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static dellAllKeys (message: any): void {
        // console.log('DellAllKeys', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.DELL_ALL_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('DellAllKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setSdlDaily (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const tms: any = {
            TmStart: 'none',
            TmEnd: 'none'
        }
        message.data.timeframes.forEach((time: any) => {
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)
            tms.TmStart = (tms.TmStart === 'none') ? start_time.toString() : `${tms.TmStart};${start_time}`
            tms.TmEnd = (tms.TmEnd === 'none') ? end_time.toString() : `${tms.TmEnd};${end_time}`
        })
        const send_data: any = {
            operator: OperatorType.SET_SDL_DAILY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point,
                ...tms
            }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            console.log(456456456456456)

            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static delSdlDaily (message: ICrudMqttMessaging): void {
        // console.log('delSdlDaily', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_DAILY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.schedule,
                Ctp_idx: message.data.access_point
            }
        }
        console.log('delSdlDaily send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static setSdlWeekly (message: ICrudMqttMessaging): void {
        // console.log('SetSdlWeekly', message)
        const topic = message.topic

        const week_tms: any = {
            Tm0_Start: 'none',
            Tm0_End: 'none',
            Tm1_Start: 'none',
            Tm1_End: 'none',
            Tm2_Start: 'none',
            Tm2_End: 'none',
            Tm3_Start: 'none',
            Tm3_End: 'none',
            Tm4_Start: 'none',
            Tm4_End: 'none',
            Tm5_Start: 'none',
            Tm5_End: 'none',
            Tm6_Start: 'none',
            Tm6_End: 'none'
        }

        message.data.timeframes.forEach((time: any) => {
            console.log(time)
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)
            if (Number(time.name) === 0) {
                week_tms.Tm0_Start = (week_tms.Tm0_Start === 'none') ? start_time.toString() : `${week_tms.Tm0_Start};${start_time}`
                week_tms.Tm0_End = (week_tms.Tm0_End === 'none') ? end_time.toString() : `${week_tms.Tm0_End};${end_time}`
            }
            if (Number(time.name) === 1) {
                week_tms.Tm1_Start = (week_tms.Tm1_Start === 'none') ? start_time.toString() : `${week_tms.Tm1_Start};${start_time}`
                week_tms.Tm1_End = (week_tms.Tm1_End === 'none') ? end_time.toString() : `${week_tms.Tm1_End};${end_time}`
            }
            if (Number(time.name) === 2) {
                week_tms.Tm2_Start = (week_tms.Tm2_Start === 'none') ? start_time.toString() : `${week_tms.Tm2_Start};${start_time}`
                week_tms.Tm2_End = (week_tms.Tm2_End === 'none') ? end_time.toString() : `${week_tms.Tm2_End};${end_time}`
            }
            if (Number(time.name) === 3) {
                week_tms.Tm3_Start = (week_tms.Tm3_Start === 'none') ? start_time.toString() : `${week_tms.Tm3_Start};${start_time}`
                week_tms.Tm3_End = (week_tms.Tm3_End === 'none') ? end_time.toString() : `${week_tms.Tm3_End};${end_time}`
            }
            if (Number(time.name) === 4) {
                week_tms.Tm4_Start = (week_tms.Tm4_Start === 'none') ? start_time.toString() : `${week_tms.Tm4_Start};${start_time}`
                week_tms.Tm4_End = (week_tms.Tm4_End === 'none') ? end_time.toString() : `${week_tms.Tm4_End};${end_time}`
            }
            if (Number(time.name) === 5) {
                week_tms.Tm5_Start = (week_tms.Tm5_Start === 'none') ? start_time.toString() : `${week_tms.Tm5_Start};${start_time}`
                week_tms.Tm5_End = (week_tms.Tm5_End === 'none') ? end_time.toString() : `${week_tms.Tm5_End};${end_time}`
            }
            if (Number(time.name) === 6) {
                week_tms.Tm6_Start = (week_tms.Tm6_Start === 'none') ? start_time.toString() : `${week_tms.Tm6_Start};${start_time}`
                week_tms.Tm6_End = (week_tms.Tm6_End === 'none') ? end_time.toString() : `${week_tms.Tm6_End};${end_time}`
            }
        })
        const send_data: any = {
            operator: OperatorType.SET_SDL_WEEKLY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.schedule,
                Ctp_idx: message.data.access_point,
                ...week_tms
            }
        }
        console.log('SetSdlWeekly send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static delSdlWeekly (message: ICrudMqttMessaging): void {
        // console.log('delSdlWeekly', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_WEEKLY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.schedule,
                Ctp_idx: message.data.access_point
            }
        }
        console.log('delSdlWeekly send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static setSdlFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('SetSdlFlexiTime', message)
        const topic = message.topic

        const days: any = {}
        message.data.timeframes.forEach((time: any) => {
            days[time.name] = true
        })
        const send_data: any = {
            operator: OperatorType.SET_SDL_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: /* (data.send_data && data.send_data.info.schedule) ? data.send_data.info.schedule : */ message.data.schedule,
                Ctp_idx: /* (data.send_data && data.send_data.info.access_point) ? data.send_data.info.access_point : */ message.data.access_point,
                DayStart: message.data.start_from,
                DaysCount: Object.keys(days).length
            }
        }
        send_data.days = days
        console.log('SetSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static addDayFlexiTime (message: any): void {
        // console.log('AddDayFlexiTime', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.ADD_DAY_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('AddDayFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static endSdlFlexiTime (message: any): void {
        // console.log('EndSdlFlexiTime', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.END_SDL_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('EndSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static delSdlFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('delSdlFlexiTime', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.schedule,
                Ctp_idx: message.data.access_point
            }
        }
        console.log('delSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static delDayFlexiTime (message: any): void {
        // console.log('DelDayFlexiTime', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.DEL_DAY_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('DelDayFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static setSdlSpecified (message: ICrudMqttMessaging): void {
        // console.log('SetSdlSpecified', message)
        const topic = message.topic

        const days: any = {}
        message.data.timeframes.forEach((time: any) => {
            days[time.name] = true
        })

        const send_data: any = {
            operator: OperatorType.SET_SDL_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: /* (data.send_data && data.send_data.info.schedule) ? data.send_data.info.schedule : */ message.data.schedule,
                Ctp_idx: /* (data.send_data && data.send_data.info.access_point) ? data.send_data.info.access_point : */ message.data.access_point,
                DaysCount: Object.keys(days).length
            }
        }
        console.log('SetSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static addDaySpecified (message: any): void {
        // console.log('AddDaySpecified', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.ADD_DAY_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('AddDaySpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static endSdlSpecified (message: any): void {
        // console.log('EndSdlSpecified', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.END_SDL_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('EndSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static delSdlSpecified (message: ICrudMqttMessaging): void {
        // console.log('delSdlSpecified', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.schedule,
                Ctp_idx: message.data.access_point
            }
        }
        console.log('delSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static dellDaySpecified (message: any): void {
        // console.log('EndSdlSpecified', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.DELL_DAY_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('EndSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }

    public static dellShedule (message: ICrudMqttMessaging): void {
        // console.log('DellShedule', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DELL_SHEDULE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.schedule,
                Ctp_idx: message.data.access_point
            }
        }
        console.log('DellShedule send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static devTest (message: any): void {
        // console.log('DellShedule', message)
        const topic = `${message.location}/registration/${message.device_id}/Operate/`
        const send_data = {
            operator: OperatorType.DEV_TEST,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.info
        }
        console.log('DellShedule send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data))
    }
}

function handleCallback (send_topic: any, send_data: any, crud_message?: ICrudMqttMessaging): any {
    console.log(88888888888888888)

    send_data = JSON.parse(send_data)
    // setTimeout(() => {
    // MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            console.log(1111111111111, `${send_topic.split('/').slice(0, -2).join('/')}/Ack/`)
            console.log(1111111111111, topicAck)
            console.log(send_data.message_id === messageAck.message_id)
            console.log(send_data.operator === `${messageAck.operator}-Ack`)

            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && send_data.message_id === messageAck.message_id && messageAck.operator === `${send_data.operator}-Ack`) {
                // if (topicAck === `${send_topic}Ack/` && send_data.message_id === messageAck.message_id && messageAck.operator === `${send_data.operator}-Ack`) {
                console.log(2222222222222222)

                MQTTBroker.client.removeListener('message', cb)
                messageAck.send_data = crud_message
                messageAck.device_topic = topicAck

                MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
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

function handleSdlUpdateCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
    // setTimeout(() => {
    // MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    console.log(12312123)

    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            console.log(topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/`, crud_message.message_id === messageAck.message_id, messageAck.operator === `${crud_message.operator}-Ack`)
            console.log(messageAck.operator)
            console.log(`${crud_message.operator}-Ack`)

            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                console.log(11111, crud_message)

                messageAck.send_data = crud_message
                // messageAck.crud_message = crud_message
                messageAck.device_topic = topicAck
                console.log('crud_message.data.schedule_type', crud_message.data.schedule_type)

                switch (crud_message.data.schedule_type) {
                    case 'daily':
                        console.log(11111, 'daily')
                        crud_message.operator = OperatorType.SET_SDL_DAILY
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlDaily(crud_message)
                        break
                    case 'weekly':
                        crud_message.operator = OperatorType.SET_SDL_WEEKLY
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlWeekly(crud_message)
                        break
                    case 'specific':
                        crud_message.operator = OperatorType.SET_SDL_SPECIFIED
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlSpecified(crud_message)
                        break
                    case 'flexitime':
                        crud_message.operator = OperatorType.SET_SDL_FLEXI_TIME
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlFlexiTime(crud_message)
                        break
                    default:
                        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                        break
                }
                MQTTBroker.client.removeListener('message', cb)
            }
        } catch (e) {

        }
    }
    return cb
}

function dateTimeToSeconds (time: string) {
    const nums = time.split(':')
    const seconds = 60 * 60 * Number(nums[0]) + 60 * Number(nums[1]) + Number(nums[2])
    return seconds
}
