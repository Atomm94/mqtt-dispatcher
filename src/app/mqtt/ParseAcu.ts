import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
// import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
// import { acuConnectionType } from '../enums/acuConnectionType.enum'
// import { accessPointType } from '../enums/accessPointType.enum'
// import { scheduleType } from '../enums/scheduleType.enum'
// import { credentialStatus } from '../enums/credentialStatus.enum'
import { acuConnectionType } from '../enums/acuConnectionType.enum'
import { accessPointType } from '../enums/accessPointType.enum'
import { accessPointDirection } from '../enums/accessPointDirection.enum'

import ParseCtp from './ParseCtp'
import { SendTopics } from './Topics'
import { extBrdProtocol } from '../enums/extBrdProtocol.enum'
import { extBrdInterface } from '../enums/extBrdInterface.enum'
import { cloneDeep } from 'lodash'

export default class ParseAcu {
    public static ping (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const send_data = {
            operator: OperatorType.PING,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handlePingCallback(topic, message) as Function)
        })
    }

    public static accept (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const send_data = {
            operator: OperatorType.ACCEPT,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static cancelRegistration (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const send_data = {
            operator: OperatorType.CANCEL_REGISTRATION,
            session_id: message.session_id,
            message_id: message.message_id,
            info: { device_id: message.data.serial_number }
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(message.topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setNetSettings (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_NET_SETTINGS,
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
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
            operator: OperatorType.GET_NET_SETTINGS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
                GMT: message.data.time.time_zone,
                NTP1: 'pool.ntp.org',
                NTP2: 'pool2.ntp.org:123',
                DST_GMT: false,
                DST_Start: 1583636400,
                DST_End: 1604196000,
                DST_Shift: 3600
            }
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setExtBrd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const info: any = {
            Brd_idx: message.data.id,
            RS485_Uart_Mode: 'none'
        }
        if (message.data.resources && 'input' in message.data.resources) info.Brd_inputs = message.data.resources.input
        if (message.data.resources && 'output' in message.data.resources) info.Brd_outputs = message.data.resources.output
        if ('protocol' in message.data) {
            if (message.data.protocol === extBrdProtocol.DEFAULT) {
                info.Brd_prot = 0
            } else {
                info.Brd_prot = 1
            }
        }
        if (message.data.interface === extBrdInterface.RS485) {
            if ('port' in message.data) info.RS485_Idx = message.data.port
            if ('address' in message.data) info.Brd_RS45_adr = (message.data.address) ? message.data.address : 'none'
            if ('baud_rate' in message.data) info.RS485_Baud_Rate = message.data.baud_rate
        } else {
            if ('port' in message.data) info.Brd_Eth_adr = message.data.port
            if ('address' in message.data) info.Brd_Eth_port = (message.data.address) ? message.data.address : 'none'
        }

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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delExtBrd (message: ICrudMqttMessaging): void {
        // console.log('devicedelExtBrd', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_EXT_BRD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }

        console.log('devicedelExtBrd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setRd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic

        const ind = message.data.answer_qty ? message.data.answer_qty : 0
        const reader_data = message.data.readers[ind]
        const info: any = {
            Rd_idx: reader_data.id,
            Rd_opt: (Number(reader_data.wg_type) !== -1) ? 1 : 2,
            Rd_type: 0,
            Rd_Key_endian: reader_data.reverse_byte_order,
            Rd_RS485_idx: reader_data.port,
            // Rd_MQTT: 'none',
            // Rd_ind_var: 0,
            Rd_beep: reader_data.enable_buzzer,
            Rd_Enable_crc: reader_data.enable_crc,
            // Rd_bt_prox: 10,
            // Rd_sens_act: 50,
            Rd_mode: reader_data.mode
            // Rd_Eth: 'none',
            // Rd_Eth_port: 0
        }
        if (Number(reader_data.wg_type) === -1) {
            info.Rd_OSDP_adr = reader_data.osdp_address
            info.Rd_OSDP_bd = reader_data.baud_rate
            info.Rd_OSDP_WgPuls = reader_data.card_data_format_flags
            info.Rd_OSDP_KeyPad = reader_data.keypad_mode
            info.Rd_OSDP_singl = reader_data.configuration
            info.Rd_OSDP_tracing = reader_data.tracing
        } else {
            info.Rd_Wg_idx = reader_data.port
            info.Rd_Wg_type = reader_data.wg_type
            // Rd_WG_RG: -1,
            // Rd_WG_Red: -1,
            // Rd_WG_Green: -1,
        }

        const send_data = {
            operator: OperatorType.SET_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delRd (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)
        const topic = message.topic
        const info: any = {
            Rd_idx: message.data.id
        }

        const send_data = {
            operator: OperatorType.DEL_RD,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        console.log('devicedelRd send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static single_pass (message: ICrudMqttMessaging): void {
        // console.log('Single_pass', message)
        const topic = message.topic
        const info: any = {
            Control_point_idx: message.data.id
        }
        if (message.data.direction === accessPointDirection.ENTRY) {
            info.Direction = 0
        } else if (message.data.direction === accessPointDirection.EXIT) {
            info.Direction = 1
        } else {
            info.Direction = -1
        }

        const send_data = {
            operator: OperatorType.SINGLE_PASS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }
        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
        // console.log('Single_pass send message', send_data)
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setAccessMode (message: ICrudMqttMessaging): void {
        // console.log('SetAccessMode', message)
        const topic = message.topic

        const info: any = {
            Control_point_idx: message.data.id
        }
        if (message.data.type === accessPointType.TURNSTILE_TWO_SIDE) {
            if (message.data.mode) info.Work_Mode_Entry = message.data.mode
            if (message.data.exit_mode) info.Work_Mode_Exit = message.data.exit_mode
        } else {
            info.Access_mode = message.data.mode
        }
        const send_data = {
            operator: OperatorType.SET_ACCESS_MODE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }
        // console.log('SetAccessMode send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }
}

function handleRdUpdateCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
    ackTimeout(send_topic, crud_message, cb, 20000)
    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                console.log('handleRdUpdateCallback', true)

                if (!crud_message.data.answer_qty) crud_message.data.answer_qty = 0

                messageAck.send_data = crud_message
                messageAck.device_topic = topicAck

                MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))

                crud_message.data.readers[crud_message.data.answer_qty].messageAck = cloneDeep(messageAck)

                crud_message.data.answer_qty++

                if (crud_message.data.answer_qty < crud_message.data.readers.length) {
                    ParseAcu.setRd(crud_message)
                } else {
                    const message = {
                        id: crud_message.data.access_point,
                        readers: crud_message.data.readers
                    }

                    console.log('crud_message', crud_message)

                    if (crud_message.data.access_point_type === accessPointType.DOOR) {
                        console.log('crud_message.data DOOR', crud_message.data)
                        crud_message.operator = OperatorType.SET_CTP_DOOR
                        delete crud_message.data.access_point_type
                        crud_message.data = message

                        ParseCtp.setCtpDoor(crud_message)
                    } else if (crud_message.data.access_point_type === accessPointType.TURNSTILE_ONE_SIDE || crud_message.data.access_point_type === accessPointType.TURNSTILE_TWO_SIDE) {
                        console.log('crud_message.data TURNSTILE_ONE_SIDE', crud_message.data)
                        crud_message.operator = OperatorType.SET_CTP_TURNSTILE
                        crud_message.data.type = crud_message.data.access_point_type
                        delete crud_message.data.access_point_type
                        crud_message.data = message
                        ParseCtp.setCtpTurnstile(crud_message)
                    } else if (crud_message.data.access_point_type === accessPointType.GATE) {
                        console.log('crud_message.data GATE', crud_message.data)
                        crud_message.operator = OperatorType.SET_CTP_GATE
                        delete crud_message.data.access_point_type
                        crud_message.data = message
                        ParseCtp.setCtpGate(crud_message)
                    } else if (crud_message.data.access_point_type === accessPointType.GATEWAY) {
                        console.log('crud_message.data GATEWAY', crud_message.data)
                        crud_message.operator = OperatorType.SET_CTP_GATEWAY
                        delete crud_message.data.access_point_type
                        crud_message.data = message
                        ParseCtp.setCtpGateway(crud_message)
                    } else if (crud_message.data.access_point_type === accessPointType.FLOOR) {
                        console.log('crud_message.data FLOOR', crud_message.data)
                        crud_message.operator = OperatorType.SET_CTP_FLOOR
                        delete crud_message.data.access_point_type
                        crud_message.data = message
                        ParseCtp.setCtpFloor(crud_message)
                    }
                }

                MQTTBroker.client.removeListener('message', cb)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return cb
}

export function handlePingCallback (send_topic: any, crud_message: any): any {
    ackTimeout(send_topic, crud_message, cb, 10000)
    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck)
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                console.log('handlePingCallback', true)
                messageAck.send_data = crud_message
                messageAck.device_topic = topicAck

                MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                MQTTBroker.client.removeListener('message', cb)
            }
        } catch (e) {

        }
    }
    return cb
}

export function handleCallback (send_topic: any, crud_message: any): any {
    ackTimeout(send_topic, crud_message, cb, 20000)
    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck)
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                // if (topicAck === `${send_topic}Ack/` && send_data.message_id === messageAck.message_id && messageAck.operator === `${send_data.operator}-Ack`) {

                messageAck.send_data = crud_message
                messageAck.device_topic = topicAck

                MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
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

export function ackTimeout (send_topic: any, crud_message: any, cb: any, timeout: number = 20000): any {
    setTimeout(() => {
        const topic = `${send_topic.split('/').slice(0, -2).join('/')}/Ack/`
        const messageAck = {
            operator: `${crud_message.operator}-Ack`,
            message_id: crud_message.message_id,
            result: {
                errorNo: 777
            },
            send_data: crud_message,
            device_topic: topic
        }

        MQTTBroker.publishMessage(topic, JSON.stringify(messageAck))
        // MQTTBroker.client.removeListener('message', cb)
    }, timeout)
}
