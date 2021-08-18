import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
// import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
// import { acuConnectionType } from '../enums/acuConnectionType.enum'
import { accessPointType } from '../enums/accessPointType.enum'
// import { scheduleType } from '../enums/scheduleType.enum'
// import { credentialStatus } from '../enums/credentialStatus.enum'
import { handleCallback } from './ParseAcu'
export default class ParseController {
    public static setCtpDoor (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        try {
            const info: any = {
                Control_point_idx: message.data.id,
                Door_sens_idx: -1,
                Button_rex_idx: -1,
                Alarm_In_idx: -1,
                Lock_Relay_idx: -1,
                Alarm_out_idx: -1,
                Leaving_Zone: -1,
                Came_To_Zone: -1
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
                info.Rd0_idx = -1
                info.Rd0_dir = -1
                info.Rd1_idx = -1
                info.Rd1_dir = -1
                info.Rd2_idx = -1
                info.Rd2_dir = -1
                info.Rd3_idx = -1
                info.Rd3_dir = -1
                const readers = message.data.readers
                readers.forEach((reader: any, i: number) => {
                    if (reader.messageAck && reader.messageAck.result.errorNo === 0) {
                        info[`Rd${i}_idx`] = reader.id
                        info[`Rd${i}_dir`] = reader.direction
                        if (reader.direction === 0) { // Entry
                            if (reader.leaving_zone) {
                                info.Leaving_Zone = reader.leaving_zone
                            }
                            if (reader.came_to_zone) {
                                info.Came_To_Zone = reader.came_to_zone
                            }
                        } else if (reader.direction === 1) { // Exit (reverse)
                            if (reader.leaving_zone) {
                                info.Came_To_Zone = reader.leaving_zone
                            }
                            if (reader.came_to_zone) {
                                info.Leaving_Zone = reader.came_to_zone
                            }
                        }
                    }
                })
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpTurnstile (message: ICrudMqttMessaging): void {
        // console.log('setCtpTurnstile', message)

        const info: any = {
            Control_point_idx: message.data.id,
            // Control_point_idx: message.data.info.Control_point_idx, /// ///for testing
            Control_type: (message.data.type === accessPointType.TURNSTILE_ONE_SIDE) ? 0 : 1,
            Sensor_Ready_idx: -1,
            Sansor_Pass_idx: -1,
            Entry_Btn_idx: -1,
            Exit_Btn_idx: -1,
            Alarm_In_idx: -1,
            Entry_Rl_idx: -1,
            Exit_Rl_idx: -1,
            Alarm_out_idx: -1,
            BlockEnt_Rl_idx: -1,
            FreeEnt_Rl_idx: -1,
            Leaving_Zone: -1,
            Came_To_Zone: -1
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
            info.Rd0_idx = -1
            info.Rd0_dir = -1
            info.Rd1_idx = -1
            info.Rd1_dir = -1
            info.Rd2_idx = -1
            info.Rd2_dir = -1
            info.Rd3_idx = -1
            info.Rd3_dir = -1
            const readers = message.data.readers
            readers.forEach((reader: any, i: number) => {
                if (reader.messageAck && reader.messageAck.result.errorNo === 0) {
                    info[`Rd${i}_idx`] = reader.id
                    info[`Rd${i}_dir`] = reader.direction
                    if (reader.direction === 0) { // Entry
                        if (reader.leaving_zone) {
                            info.Leaving_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Came_To_Zone = reader.came_to_zone
                        }
                    } else if (reader.direction === 1) { // Exit (reverse)
                        if (reader.leaving_zone) {
                            info.Came_To_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Leaving_Zone = reader.came_to_zone
                        }
                    }
                }
            })
        }
        const topic = message.topic
        const send_data: any = {
            operator: OperatorType.SET_CTP_TURNSTILE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        // console.log('setCtpTurnstile send message', send_data)

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

        // console.log('delCtpTurnstile send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpGate (message: ICrudMqttMessaging): void {
        // console.log('setCtpGate', message)

        const info: any = {
            Control_point_idx: message.data.id,
            Loop_Ready_idx: -1,
            Open_Btn_idx: -1,
            Alarm_In_idx: -1,
            Lock_Relay_idx: -1,
            Leaving_Zone: -1,
            Came_To_Zone: -1
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
            info.Rd0_idx = -1
            info.Rd0_dir = -1
            info.Rd1_idx = -1
            info.Rd1_dir = -1
            info.Rd2_idx = -1
            info.Rd2_dir = -1
            info.Rd3_idx = -1
            info.Rd3_dir = -1
            const readers = message.data.readers
            readers.forEach((reader: any, i: number) => {
                if (reader.messageAck && reader.messageAck.result.errorNo === 0) {
                    info[`Rd${i}_idx`] = reader.id
                    info[`Rd${i}_dir`] = reader.direction
                    if (reader.direction === 0) { // Entry
                        if (reader.leaving_zone) {
                            info.Leaving_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Came_To_Zone = reader.came_to_zone
                        }
                    } else if (reader.direction === 1) { // Exit (reverse)
                        if (reader.leaving_zone) {
                            info.Came_To_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Leaving_Zone = reader.came_to_zone
                        }
                    }
                }
            })
        }
        const topic = message.topic
        const send_data: any = {
            operator: OperatorType.SET_CTP_GATE,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }

        // console.log('setCtpGate send message', send_data)

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

        // console.log('delCtpGate send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpGateway (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        const info: any = {
            Control_point_idx: message.data.id,
            Door_sens_idx: -1,
            Open_Btn_idx: -1,
            Alarm_In_idx: -1,
            Lock_Relay_idx: -1,
            Alarm_out_idx: -1,
            Leaving_Zone: -1,
            Came_To_Zone: -1
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
            info.Rd0_idx = -1
            info.Rd0_dir = -1
            info.Rd1_idx = -1
            info.Rd1_dir = -1
            info.Rd2_idx = -1
            info.Rd2_dir = -1
            info.Rd3_idx = -1
            info.Rd3_dir = -1
            const readers = message.data.readers
            readers.forEach((reader: any, i: number) => {
                if (reader.messageAck && reader.messageAck.result.errorNo === 0) {
                    info[`Rd${i}_idx`] = reader.id
                    info[`Rd${i}_dir`] = reader.direction
                    if (reader.direction === 0) { // Entry
                        if (reader.leaving_zone) {
                            info.Leaving_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Came_To_Zone = reader.came_to_zone
                        }
                    } else if (reader.direction === 1) { // Exit (reverse)
                        if (reader.leaving_zone) {
                            info.Came_To_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Leaving_Zone = reader.came_to_zone
                        }
                    }
                }
            })
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

        // console.log('delCtpGateway send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setCtpFloor (message: ICrudMqttMessaging): void {
        // console.log('deviceSetMqttSettings', message)

        const info: any = {
            Control_point_idx: message.data.id,
            Alarm_In_idx: -1,
            Lock_Relay_idx: -1,
            Leaving_Zone: -1,
            Came_To_Zone: -1
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
            info.Rd0_idx = -1
            info.Rd0_dir = -1
            info.Rd1_idx = -1
            info.Rd1_dir = -1
            info.Rd2_idx = -1
            info.Rd2_dir = -1
            info.Rd3_idx = -1
            info.Rd3_dir = -1
            const readers = message.data.readers
            readers.forEach((reader: any, i: number) => {
                if (reader.messageAck && reader.messageAck.result.errorNo === 0) {
                    info[`Rd${i}_idx`] = reader.id
                    info[`Rd${i}_dir`] = reader.direction
                    if (reader.direction === 0) { // Entry
                        if (reader.leaving_zone) {
                            info.Leaving_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Came_To_Zone = reader.came_to_zone
                        }
                    } else if (reader.direction === 1) { // Exit (reverse)
                        if (reader.leaving_zone) {
                            info.Came_To_Zone = reader.leaving_zone
                        }
                        if (reader.came_to_zone) {
                            info.Leaving_Zone = reader.came_to_zone
                        }
                    }
                }
            })
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

        // console.log('delCtpFloor send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }
}
