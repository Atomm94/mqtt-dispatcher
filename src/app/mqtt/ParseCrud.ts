import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
import { acuConnectionType } from '../enums/acuConnectionType.enum'
import { accessPointType } from '../enums/accessPointType.enum'
import { scheduleType } from '../enums/scheduleType.enum'

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
            case OperatorType.DEL_EXT_BRD:
                this.delExtBrd(message)
                break

            case OperatorType.SET_RD:
                this.setRd(message)
                break
            case OperatorType.GET_RD:
                this.getRd(message)
                break
            case OperatorType.DEL_RD:
                this.delRd(message)
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
            case OperatorType.GET_CTP_DOOR:
                this.getCtpDoor(message)
                break

            case OperatorType.SET_CTP_TURNSTILE:
                this.setCtpTurnstile(message)
                break
            case OperatorType.DEL_CTP_TURNSTILE:
                this.delCtpTurnstile(message)
                break
            case OperatorType.GET_CTP_TURNSTILE:
                this.getCtpTurnstile(message)
                break
            case OperatorType.SET_CTP_GATE:
                this.setCtpGate(message)
                break
            case OperatorType.DEL_CTP_GATE:
                this.delCtpGate(message)
                break
            case OperatorType.GET_CTP_GATE:
                this.getCtpGate(message)
                break
            case OperatorType.SET_CTP_GATEWAY:
                this.setCtpGateway(message)
                break
            case OperatorType.DEL_CTP_GATEWAY:
                this.delCtpGateway(message)
                break
            case OperatorType.GET_CTP_GATEWAY:
                this.getCtpGateway(message)
                break
            case OperatorType.SET_CTP_FLOOR:
                this.setCtpFloor(message)
                break
            case OperatorType.DEL_CTP_FLOOR:
                this.delCtpFloor(message)
                break
            case OperatorType.GET_CTP_FLOOR:
                this.getCtpFloor(message)
                break

            case OperatorType.SET_EVENTS_MOD:
                this.setEventsMod(message)
                break
            case OperatorType.GET_EVENTS_MOD:
                this.getEventsMod(message)
                break
            case OperatorType.GET_EVENTS:
                // this.getEvents(message)
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

    public static logOut (message: ICrudMqttMessaging): void {
        // console.log('logOut', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.LOGOUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
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
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
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
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getNetSettings (message: ICrudMqttMessaging): void {
        // send message to device
        // {
        //     "operator": "GetNetSettings",
        //     "session_Id": "1111111111",
        //     "message_Id": "222222222222",
        //     "info":"none"
        // }

        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_DATE_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
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
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setMqttSettings (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_MQTT_SETTINGS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getMqttSettings (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_MQTT_SETTINGS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getStatusAcu (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_STATUS_ACU,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setExtBrd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const info: any = {
            Brd_idx: message.data.id
        }

        if (message.data.resources && 'input' in message.data.resources) info.Brd_inputs = message.data.resources.input
        if (message.data.resources && 'output' in message.data.resources) info.Brd_outputs = message.data.resources.output
        if ('port' in message.data) info.RS485_Idx = message.data.port
        if ('address' in message.data) info.Brd_RS45_adr = (message.data.address) ? message.data.address : 'none'
        if ('uart_mode' in message.data) info.RS485_Uart_Mode = message.data.uart_mode
        if ('baud_rate' in message.data) info.RS485_Baud_Rate = message.data.baud_rate
        if ('protocol' in message.data) info.Brd_prot = message.data.protocol
        // Brd_Eth_adr: message.data.address ? message.data.address : 'none'
        // Brd_Eth_port: message.data.port
        const send_data = {
            operator: OperatorType.SET_EXT_BRD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getExtBrd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_EXT_BRD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delExtBrd (message: ICrudMqttMessaging): void {
        // console.log('devicedelExtBrd', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_EXT_BRD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        console.log('devicedelExtBrd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setRd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Rd_idx: message.data.id,
                Rd_opt: (message.data.interface_type === 'Wiegand') ? 1 : 2,
                Rd_type: 0,
                Rd_Wg_idx: message.data.port,
                Rd_Wg_type: message.data.interface_type,
                Rd_Key_endian: message.data.reverse,
                // Rd_WG_RG: -1,
                // Rd_WG_Red: -1,
                // Rd_WG_Green: -1,
                Rd_RS485_idx: message.data.port,
                Rd_OSDP_adr: message.data.osdp_address,
                Rd_OSDP_bd: message.data.baud_rate,
                Rd_OSDP_WgPuls: message.data.card_data_format_flags,
                Rd_OSDP_KeyPad: message.data.keypad_mode,
                Rd_OSDP_singl: message.data.configuration,
                Rd_OSDP_tracing: message.data.tracing,
                // Rd_MQTT: 'none',
                // Rd_ind_var: 0,
                Rd_beep: message.data.beep,
                // Rd_bt_prox: 10,
                // Rd_sens_act: 50,
                Rd_mode: message.data.mode
                // Rd_Eth: 'none',
                // Rd_Eth_port: 0
            }
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleRdUpdateCallback(topic, message) as Function)
        })
    }

    public static getRd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delRd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        console.log('devicedelRd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setOutput (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_OUTPUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getOutput (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_OUTPUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getInput (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_INPUT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static cardProtection (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.CARD_PROTECTION,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpDoor (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        try {
            const info: any = {
                Control_point_idx: message.data.id
            }
            if (message.data.resources) {
                const resources = message.data.resources
                for (const resource in resources) {
                    const element = resources[resource]
                    switch (element.name) {
                        case 'Door_sensor':
                            info.Door_sens_opt = element.component_source
                            info.Door_sens_idx = element.input
                            info.Door_sens_Condition = element.condition
                            break
                        case 'Exit_button':
                            info.Button_rex_opt = element.component_source
                            info.Button_rex_idx = element.input
                            info.Button_rex_Condition = element.condition
                            break
                        case 'Fire_Alarm_in':
                            info.Alarm_In_opt = element.component_source
                            info.Alarm_In_idx = element.input
                            info.Allarm_Input_Condition = element.condition
                            break
                        case 'Lock':
                            info.Lock_Relay_opt = element.component_source
                            info.Lock_Relay_idx = element.output
                            info.Door_Lock_mode = element.relay_mode
                            info.Door_Lock_type = element.type
                            info.Door_Lock_puls = element.impulse_time
                            info.Door_Delay = element.entry_exit_open_durations
                            info.Door_Sens_Autolock = element.door_sensor_autolock
                            break
                        case 'Alarm_out':
                            info.Alarm_out_opt = element.component_source
                            info.Alarm_out_idx = element.output
                            info.Alarm_out_tm = element.impulse_time
                            info.Alarm_mod = element.relay_mode
                            info.Alarm_out_mod = element.type
                            break
                        default:
                            break
                    }
                }
            }

            if (message.data.readers) {
                const reader = message.data.readers
                info[`Rd${+reader.port - 1}_idx`] = reader.port
                info[`Rd${+reader.port - 1}_dir`] = reader.direction
            }
            const topic = message.topic
            const send_data: any = {
                operator: OperatorType.SET_CTP_DOOR,
                session_id: message.session_id,
                message_id: message.message_id,
                info: info
            }

            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
            })
        } catch (error) {
            console.log(error)
        }
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

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getCtpDoor (message: ICrudMqttMessaging): void {
        // console.log('getCtpDoor', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_CTP_DOOR,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('getCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpTurnstile (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        const info: any = {
            Control_point_idx: message.data.id,
            // Control_point_idx: message.data.info.Control_point_idx, //////for testing
            Control_type: (message.data.type === accessPointType.TURNSTILE_ONE_SIDE) ? 0 : 1
        }
        if (message.data.resources) {
            const resources = message.data.resources
            for (const resource in resources) {
                const element = resources[resource]
                switch (element.name) {
                    case 'Turnstile_ready':
                        info.Sensor_Ready_opt = element.component_source
                        info.Sensor_Ready_idx = element.input
                        info.Sensor_Ready_Condition = element.condition
                        break
                    case 'Pass_control':
                        info.Sansor_Pass_opt = element.component_source
                        info.Sansor_Pass_idx = element.input
                        info.Sensor_Pass_Condition = element.condition
                        break
                    case 'Entry_button':
                        info.Entry_Btn_opt = element.component_source
                        info.Entry_Btn_idx = element.input
                        info.Entry_Btn_Condition = element.condition
                        break
                    case 'Exit_button':
                        info.Exit_Btn_opt = element.component_source
                        info.Exit_Btn_idx = element.input
                        info.Exit_Btn_Condition = element.condition
                        break
                    case 'Fire_Alarm_in':
                        info.Alarm_In_opt = element.component_source
                        info.Alarm_In_idx = element.input
                        info.Allarm_Input_Condition = element.condition
                        break
                    case 'Entry_relay':
                        info.Entry_Rl_opt = element.component_source
                        info.Entry_Rl_idx = element.input
                        info.Entry_Rl_mode = element.relay_mode
                        info.Entry_Rl_type = element.type
                        info.Entry_Rl_pulse = element.impulse_time
                        info.Entry_Delay = element.entry_exit_open_durations
                        break
                    case 'Exit_relay':
                        info.Exit_Rl_opt = element.component_source
                        info.Exit_Rl_idx = element.input
                        info.Exit_Rl_mode = element.relay_mode
                        info.Exit_Rl_type = element.type
                        info.Exit_Rl_pulse = element.impulse_time
                        info.Entry_Delay = element.entry_exit_open_durations
                        break
                    case 'Alarm_out':
                        info.Alarm_out_opt = element.component_source
                        info.Alarm_out_idx = element.output
                        info.Alarm_out_tm = element.impulse_time
                        info.Alarm_mod = element.relay_mode
                        info.Alarm_out_mod = element.type
                        break
                    case 'Block_Turnstile':
                        info.BlockEnt_Rl_opt = element.component_source
                        info.BlockEnt_Rl_idx = element.output
                        info.BlockEnt_Rl_pulse = element.impulse_time
                        info.BlockEnt_Rl_mode = element.relay_mode
                        info.BlockEnt_Rl_type = element.type
                        break
                    case 'Emergency_open':
                        info.FreeEnt_Rl_opt = element.component_source
                        info.FreeEnt_Rl_idx = element.output
                        info.FreeEnt_Rl_pulse = element.impulse_time
                        info.FreeEnt_Rl_mode = element.relay_mode
                        info.FreeEnt_Rl_type = element.type
                        break

                    default:
                        break
                }
            }
        }

        if (message.data.readers) {
            const readers = message.data.readers
            info[`Rd${+readers.port - 1}_idx`] = readers.port
            info[`Rd${+readers.port - 1}_dir`] = readers.direction
        }
        const topic = message.topic
        const send_data: any = {
            operator: OperatorType.SET_CTP_TURNSTILE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delCtpTurnstile (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_CTP_TURNSTILE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getCtpTurnstile (message: ICrudMqttMessaging): void {
        // console.log('getCtpTurnstile', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_CTP_TURNSTILE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('getCtpTurnstile send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpGate (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        const info: any = {
            Control_point_idx: message.data.id
        }
        if (message.data.resources) {
            const resources = message.data.resources
            for (const resource in resources) {
                const element = resources[resource]
                switch (element.name) {
                    case 'Loop_sensor':
                        info.Loop_Ready_opt = element.component_source
                        info.Loop_Ready_idx = element.input
                        info.Loop_Ready_Condition = element.condition
                        break
                    case 'Open_button':
                        info.Open_Btn_opt = element.component_source
                        info.Open_Btn_idx = element.input
                        info.Open_Btn_Condition = element.condition
                        break
                    case 'Fire_Alarm_in':
                        info.Alarm_In_opt = element.component_source
                        info.Alarm_In_idx = element.input
                        info.Alarm_In_Condition = element.condition
                        break
                    case 'Open_relay':
                        info.Lock_Relay_opt = element.component_source
                        info.Lock_Relay_idx = element.output
                        info.Door_Lock_mode = element.relay_mode
                        info.Door_Lock_type = element.type
                        info.Door_Lock_pulse = element.impulse_time
                        info.Door_Delay = element.entry_exit_open_durations
                        info.Door_Sens_Autolock = element.door_sensor_autolock
                        break
                    default:
                        break
                }
            }
        }

        if (message.data.readers) {
            const readers = message.data.readers
            info[`Rd${+readers.port - 1}_idx`] = readers.port
            info[`Rd${+readers.port - 1}_dir`] = readers.direction
        }
        const topic = message.topic
        const send_data: any = {
            operator: OperatorType.SET_CTP_GATE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delCtpGate (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_CTP_GATE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getCtpGate (message: ICrudMqttMessaging): void {
        // console.log('getCtpGate', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_CTP_GATE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('getCtpGate send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpGateway (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        const info: any = {
            Control_point_idx: message.data.id
        }
        if (message.data.resources) {
            const resources = message.data.resources
            for (const resource in resources) {
                const element = resources[resource]
                switch (element.name) {
                    case 'Door_sensor':
                        info.Door_sens_opt = element.component_source
                        info.Door_sens_idx = element.input
                        info.Door_sens_Condition = element.condition
                        break
                    case 'Open_button':
                        info.Open_Btn_opt = element.component_source
                        info.Open_Btn_idx = element.input
                        info.Open_Btn_Condition = element.condition
                        break
                    case 'Fire_Alarm_in':
                        info.Alarm_In_opt = element.component_source
                        info.Alarm_In_idx = element.input
                        info.Allarm_Input_Condition = element.condition
                        break
                    case 'Lock':
                        info.Lock_Relay_opt = element.component_source
                        info.Lock_Relay_idx = element.output
                        info.Door_Lock_mode = element.relay_mode
                        info.Door_Lock_type = element.type
                        info.Door_Lock_pulse = element.impulse_time
                        info.Door_Delay = element.entry_exit_open_durations
                        info.Door_Sens_Autolock = element.door_sensor_autolock

                        break
                    case 'Alarm_out':
                        info.Alarm_out_opt = element.component_source
                        info.Alarm_out_idx = element.output
                        info.Alarm_out_tm = element.impulse_time
                        info.Alarm_mod = element.relay_mode
                        info.Alarm_out_mod = element.type
                        break
                    default:
                        break
                }
            }
        }

        if (message.data.readers) {
            const readers = message.data.readers
            info[`Rd${+readers.port - 1}_idx`] = readers.port
            info[`Rd${+readers.port - 1}_dir`] = readers.direction
        }
        const topic = message.topic
        const send_data: any = {
            operator: OperatorType.SET_CTP_GATEWAY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delCtpGateway (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_CTP_GATEWAY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getCtpGateway (message: ICrudMqttMessaging): void {
        // console.log('getCtpGateway', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_CTP_GATEWAY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('getCtpGateway send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpFloor (message: ICrudMqttMessaging): void {
        try {
            // console.log('deviceSetMqttSettings', message)

            const info: any = {
                Control_point_idx: message.data.id
            }
            if (message.data.resources) {
                const resources = message.data.resources
                for (const resource in resources) {
                    const element = resources[resource]
                    switch (element.name) {
                        case 'Fire_Alarm_in':
                            info.Alarm_In_opt = element.component_source
                            info.Alarm_In_idx = element.input
                            info.Allarm_Input_Condition = element.condition
                            break
                        case 'Lock':
                            info.Lock_Relay_opt = element.component_source
                            info.Lock_Relay_idx = element.output
                            info.Door_Lock_mode = element.relay_mode
                            info.Door_Lock_type = element.type
                            info.Door_Lock_pulse = element.impulse_time
                            info.Door_Delay = element.entry_exit_open_durations
                            break
                        default:
                            break
                    }
                }
            }

            if (message.data.readers) {
                const readers = message.data.readers
                info[`Rd${+readers.port - 1}_idx`] = readers.port
                info[`Rd${+readers.port - 1}_dir`] = readers.direction
            }

            const topic = message.topic
            const send_data: any = {
                operator: OperatorType.SET_CTP_FLOOR,
                session_id: message.session_id,
                message_id: message.message_id,
                info: info
            }

            // console.log('deviceSetCtpDoor send message', send_data)

            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
            })
        } catch (error) {
            console.log(error)
        }
    }

    public static delCtpFloor (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_CTP_FLOOR,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('deviceSetCtpDoor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getCtpFloor (message: ICrudMqttMessaging): void {
        // console.log('getCtpFloor', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_CTP_FLOOR,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Control_point_idx: message.data.id
            }
        }

        // console.log('getCtpFloor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setEventsMod (message: ICrudMqttMessaging): void {
        // console.log('SetEventsMod', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_EVENTS_MOD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('SetEventsMod send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getEventsMod (message: ICrudMqttMessaging): void {
        // console.log('GetEventsMod', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_EVENTS_MOD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('GetEventsMod send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getEvents (message: ICrudMqttMessaging): void {
        // console.log('GetEvents', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_EVENTS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('GetEvents send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setAccessMode (message: ICrudMqttMessaging): void {
        // console.log('SetAccessMode', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_ACCESS_MODE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('SetAccessMode send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static getAccessMode (message: ICrudMqttMessaging): void {
        // console.log('GetAccessMode', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.GET_ACCESS_MODE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('GetAccessMode send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static single_pass (message: ICrudMqttMessaging): void {
        // console.log('Single_pass', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SINGLE_PASS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('Single_pass send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCardKeys (message: ICrudMqttMessaging): void {
        // console.log('SetCardKeys', message)
        const info: any = {}
        console.log(1111111111111, message.data)

        info.KeysDataLength = '66'
        info.KeysCount = message.data.length
        message.data.key_len = 4
        message.data.status = 1
        message.data.schedule_id = 111
        message.data.Kind_key = 0
        message.data.Key_type = 0
        message.data.First_Use_Counter = 0
        message.data.Last_Use_Counter = 0
        message.data.Passes = -1
        message.data.ABP = 0
        message.data.ABP_Time = 0
        message.data.Start_date = 0
        message.data.Expiration_date = 0

        let keys = '/'
        message.data.forEach((credential:any) => {
            keys += `${credential.cardholder};`
            keys += `${credential.access_point};`
            keys += `${credential.key_len};`
            keys += `${credential.code};`
            keys += `${credential.status};`
            keys += `${credential.schedule_id};`
            keys += `${credential.Kind_key};`
            keys += `${credential.Key_type};`
            keys += `${credential.Passes};`
            keys += `${credential.First_Use_Counter};`
            keys += `${credential.Last_Use_Counter};`
            keys += `${credential.Passes};`
            keys += `${credential.ABP};`
            keys += `${credential.ABP_Time};`
            keys += `${credential.Start_date};`
            keys += `${credential.Expiration_date};`
            keys += '/'
        })
        info.Keys = keys
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_CARD_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        console.log('SetCardKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static addCardKey (message: ICrudMqttMessaging): void {
        // console.log('AddCardKey', message)
        const info: any = {}
        info.KeysDataLength = '66'
        info.KeysCount = message.data.length
        let keys = '/'
        message.data.key_len = 4
        message.data.status = 1
        message.data.schedule_id = 111
        message.data.Kind_key = 0
        message.data.Key_type = 0
        message.data.First_Use_Counter = 0
        message.data.Last_Use_Counter = 0
        message.data.Passes = -1
        message.data.ABP = 0
        message.data.ABP_Time = 0
        message.data.Start_date = 0
        message.data.Expiration_date = 0
        // message.data.forEach((credential: any) => {

            keys += `${message.data.cardholder};`
            keys += `${message.data.access_point};`
            keys += `${message.data.key_len};`
            keys += `${message.data.code};`
            keys += `${message.data.status};`
            keys += `${message.data.schedule_id};`
            keys += `${message.data.Kind_key};`
            keys += `${message.data.Key_type};`
            keys += `${message.data.Passes};`
            keys += `${message.data.First_Use_Counter};`
            keys += `${message.data.Last_Use_Counter};`
            keys += `${message.data.Passes};`
            keys += `${message.data.ABP};`
            keys += `${message.data.ABP_Time};`
            keys += `${message.data.Start_date};`
            keys += `${message.data.Expiration_date};`
            keys += '/'

        // })
        info.Keys = keys
        const topic = message.topic
        const send_data = {
            operator: OperatorType.ADD_CARD_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }
        // console.log('AddCardKey send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static editKey (message: ICrudMqttMessaging): void {
        // console.log('EditKey', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.EDIT_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Ctp_idx: message.data.access_point,
                Key: message.data.code,
                Key_status: message.data.status,
                Key_len: 4 // hardcode !!
            }
        }
        // console.log('EditKey send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static dellKeys (message: ICrudMqttMessaging): void {
        // console.log('DellKeys', message)
        const topic = message.topic
        const keys = `/${message.data.id}/`
        const send_data = {
            operator: OperatorType.DELL_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                KeysDataLength: keys.length,
                Keys_count: 1,
                Keys_id: keys
            }
        }
        // console.log('DellKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static dellAllKeys (message: ICrudMqttMessaging): void {
        // console.log('DellAllKeys', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DELL_ALL_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('DellAllKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
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
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point
            }
        }
        // console.log('delSdlDaily send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static setSdlWeekly (message: ICrudMqttMessaging): void {
        // console.log('SetSdlWeekly', message)
        const topic = message.topic

        const week_tms: any = {
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
            Tm6_End: 'none',
            Tm7_Start: 'none',
            Tm7_End: 'none'
        }

        message.data.timeframes.forEach((time: any) => {
            // console.log(time)
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)
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
            if (Number(time.name) === 7) {
                week_tms.Tm7_Start = (week_tms.Tm7_Start === 'none') ? start_time.toString() : `${week_tms.Tm7_Start};${start_time}`
                week_tms.Tm7_End = (week_tms.Tm7_End === 'none') ? end_time.toString() : `${week_tms.Tm7_End};${end_time}`
            }
        })
        const send_data: any = {
            operator: OperatorType.SET_SDL_WEEKLY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point,
                ...week_tms
            }
        }
        // console.log('SetSdlWeekly send message', send_data)

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
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point
            }
        }
        // console.log('delSdlWeekly send message', send_data)

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
                Shedule_id: /* (data.send_data && data.send_data.info.schedule) ? data.send_data.info.schedule : */ message.data.id,
                Ctp_idx: /* (data.send_data && data.send_data.info.access_point) ? data.send_data.info.access_point : */ message.data.access_point,
                DayStart: message.data.start_from,
                DaysCount: Object.keys(days).length
            }
        }
        send_data.days = days
        // console.log('SetSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static addDayFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('AddDayFlexiTime', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.ADD_DAY_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('AddDayFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static endSdlFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('EndSdlFlexiTime', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.END_SDL_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('EndSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delSdlFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('delSdlFlexiTime', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point
            }
        }
        // console.log('delSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static delDayFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('DelDayFlexiTime', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_DAY_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('DelDayFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
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
                Shedule_id: /* (data.send_data && data.send_data.info.schedule) ? data.send_data.info.schedule : */ message.data.id,
                Ctp_idx: /* (data.send_data && data.send_data.info.access_point) ? data.send_data.info.access_point : */ message.data.access_point,
                DaysCount: Object.keys(days).length
            }
        }
        // console.log('SetSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static addDaySpecified (message: ICrudMqttMessaging): void {
        // console.log('AddDaySpecified', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.ADD_DAY_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('AddDaySpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static endSdlSpecified (message: ICrudMqttMessaging): void {
        // console.log('EndSdlSpecified', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.END_SDL_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('EndSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delSdlSpecified (message: ICrudMqttMessaging): void {
        // console.log('delSdlSpecified', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point
            }
        }
        // console.log('delSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static dellDaySpecified (message: ICrudMqttMessaging): void {
        // console.log('EndSdlSpecified', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DELL_DAY_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('EndSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static dellShedule (message: ICrudMqttMessaging): void {
        // console.log('DellShedule', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DELL_SHEDULE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point
            }
        }
        // console.log('DellShedule send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, sent_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static devTest (message: ICrudMqttMessaging): void {
        // console.log('DellShedule', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEV_TEST,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('DellShedule send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }
}

function handleCallback (send_topic: any, crud_message: any): any {
    // setTimeout(() => {
    // MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    function cb (topicAck: any, messageAck: any) {
        try {
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                // if (topicAck === `${send_topic}Ack/` && send_data.message_id === messageAck.message_id && messageAck.operator === `${send_data.operator}-Ack`) {

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
    // console.log(12312123)

    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            // console.log(topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/`, crud_message.message_id === messageAck.message_id, messageAck.operator === `${crud_message.operator}-Ack`)
            // console.log(messageAck.operator)
            // console.log(`${crud_message.operator}-Ack`)

            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                messageAck.send_data = crud_message
                // messageAck.crud_message = crud_message
                messageAck.device_topic = topicAck
                if (messageAck.result.errorNo === 0) {
                    if (crud_message.data.schedule_type === scheduleType.DAILY) {
                        crud_message.operator = OperatorType.SET_SDL_DAILY
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlDaily(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.WEEKLY) {
                        crud_message.operator = OperatorType.SET_SDL_WEEKLY
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlWeekly(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.SPECIFIC) {
                        crud_message.operator = OperatorType.SET_SDL_SPECIFIED
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlSpecified(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.FLEXITIME) {
                        crud_message.operator = OperatorType.SET_SDL_FLEXI_TIME
                        delete crud_message.data.schedule_type
                        ParseCrud.setSdlFlexiTime(crud_message)
                    } else {
                        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                    }
                } else {
                    MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                }

                MQTTBroker.client.removeListener('message', cb)
            }
        } catch (e) {

        }
    }
    return cb
}

function handleRdUpdateCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
    // setTimeout(() => {
    // MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    // console.log(12312123)

    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                console.log('handleRdUpdateCallback', true)

                messageAck.send_data = crud_message
                // messageAck.crud_message = crud_message
                messageAck.device_topic = topicAck
                const message = {
                    id: crud_message.data.access_point,
                    readers: {
                        port: crud_message.data.port,
                        direction: crud_message.data.direction
                    }
                }
                if (crud_message.data.access_point_type === accessPointType.DOOR) {
                    console.log('crud_message.data DOOR', crud_message.data)
                    crud_message.operator = OperatorType.SET_CTP_DOOR
                    delete crud_message.data.access_point_type
                    crud_message.data = message

                    ParseCrud.setCtpDoor(crud_message)
                } else if (crud_message.data.access_point_type === accessPointType.TURNSTILE_ONE_SIDE || crud_message.data.access_point_type === accessPointType.TURNSTILE_TWO_SIDE) {
                    console.log('crud_message.data TURNSTILE_ONE_SIDE', crud_message.data)
                    crud_message.operator = OperatorType.SET_CTP_TURNSTILE
                    crud_message.data.type = crud_message.data.access_point_type
                    delete crud_message.data.access_point_type
                    crud_message.data = message
                    ParseCrud.setCtpTurnstile(crud_message)
                } else if (crud_message.data.access_point_type === accessPointType.GATE) {
                    console.log('crud_message.data GATE', crud_message.data)
                    crud_message.operator = OperatorType.SET_CTP_GATE
                    delete crud_message.data.access_point_type
                    crud_message.data = message
                    ParseCrud.setCtpGate(crud_message)
                } else if (crud_message.data.access_point_type === accessPointType.GATEWAY) {
                    console.log('crud_message.data GATEWAY', crud_message.data)
                    crud_message.operator = OperatorType.SET_CTP_GATEWAY
                    // delete crud_message.data.access_point_type
                    crud_message.data = message
                    ParseCrud.setCtpGateway(crud_message)
                } else if (crud_message.data.access_point_type === accessPointType.FLOOR) {
                    console.log('crud_message.data FLOOR', crud_message.data)
                    crud_message.operator = OperatorType.SET_CTP_FLOOR
                    delete crud_message.data.access_point_type
                    crud_message.data = message
                    ParseCrud.setCtpFloor(crud_message)
                } else {
                    console.log('crud_message.data 2', crud_message.data)
                    MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                }
                MQTTBroker.client.removeListener('message', cb)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return cb
}

function dateTimeToSeconds (time: string) {
    const nums = time.split(':')
    const seconds = 60 * 60 * Number(nums[0]) + 60 * Number(nums[1]) + Number(nums[2])
    return seconds
}
