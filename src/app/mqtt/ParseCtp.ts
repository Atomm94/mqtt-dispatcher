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
            let info: any = {
                Control_point_idx: message.data.id
            }
            const resources = message.data.resourcesForSendDevice
            if (resources) {
                // info.Door_sens_idx = -1
                // info.Button_rex_idx = -1
                // info.Alarm_In_idx = -1
                // info.Lock_Relay_idx = -1
                // info.Alarm_out_idx = -1

                for (const resource in resources) {
                    const element = resources[resource]
                    switch (resource) {
                        case 'Door_sensor':
                            if (element === -1) {
                                info.Door_sens_idx = -1
                            } else {
                                if ('component_source' in element) info.Door_sens_opt = element.component_source
                                if ('input' in element) info.Door_sens_idx = element.input - 1
                                if ('condition' in element) info.Door_sens_Condition = element.condition
                            }
                            break
                        case 'Exit_button':
                            if (element === -1) {
                                info.Button_rex_idx = -1
                            } else {
                                if ('component_source' in element) info.Button_rex_opt = element.component_source
                                if ('input' in element) info.Button_rex_idx = element.input - 1
                                if ('condition' in element) info.Button_rex_Condition = element.condition
                            }
                            break
                        case 'Fire_Alarm_in':
                            if (element === -1) {
                                info.Alarm_In_idx = -1
                            } else {
                                if ('component_source' in element) info.Alarm_In_opt = element.component_source
                                if ('input' in element) info.Alarm_In_idx = element.input - 1
                                if ('condition' in element) info.Allarm_Input_Condition = element.condition
                            }
                            break
                        case 'Lock':
                            if (element === -1) {
                                info.Lock_Relay_idx = -1
                            } else {
                                if ('component_source' in element) info.Lock_Relay_opt = element.component_source
                                if ('output' in element) info.Lock_Relay_idx = element.output - 1
                                if ('relay_mode' in element) info.Door_Lock_mode = element.relay_mode
                                if ('type' in element) info.Door_Lock_type = element.type
                                if ('impulse_time' in element) info.Door_Lock_puls = element.impulse_time
                                if ('entry_exit_open_durations' in element) info.Door_Delay = element.entry_exit_open_durations
                                if ('door_sensor_autolock' in element) info.Door_Sens_Autolock = element.door_sensor_autolock
                            }
                            break
                        case 'Alarm_out':
                            if (element === -1) {
                                info.Alarm_out_idx = -1
                            } else {
                                if ('component_source' in element) info.Alarm_out_opt = element.component_source
                                if ('output' in element) info.Alarm_out_idx = element.output - 1
                                if ('impulse_time' in element) info.Alarm_out_tm = element.impulse_time
                                if ('relay_mode' in element) info.Alarm_mod = element.relay_mode
                                if ('type' in element) info.Alarm_out_mod = element.type
                            }
                            break
                        default:
                            break
                    }
                }
            }
            info = this.settingReaders(message.data, info)

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

        let info: any = {
            Control_point_idx: message.data.id
            // Control_point_idx: message.data.info.Control_point_idx, /// ///for testing
        }
        const resources = message.data.resourcesForSendDevice
        if (resources) {
            info.Control_type = (message.data.type === accessPointType.TURNSTILE_ONE_SIDE) ? 0 : 1
            // info.Sensor_Ready_idx = -1
            // info.Sansor_Pass_idx = -1
            // info.Entry_Btn_idx = -1
            // info.Exit_Btn_idx = -1
            // info.Alarm_In_idx = -1
            // info.Entry_Rl_idx = -1
            // info.Exit_Rl_idx = -1
            // info.Alarm_out_idx = -1
            // info.BlockEnt_Rl_idx = -1
            // info.FreeEnt_Rl_idx = -1

            for (const resource in resources) {
                const element = resources[resource]
                switch (resource) {
                    case 'Turnstile_ready':
                        if (element === -1) {
                            info.Sensor_Ready_idx = -1
                        } else {
                            if ('component_source' in element) info.Sensor_Ready_opt = element.component_source
                            if ('input' in element) info.Sensor_Ready_idx = element.input - 1
                            if ('condition' in element) info.Sensor_Ready_Condition = element.condition
                        }
                        break
                    case 'Pass_control':
                        if (element === -1) {
                            info.Sansor_Pass_idx = -1
                        } else {
                            if ('component_source' in element) info.Sansor_Pass_opt = element.component_source
                            if ('input' in element) info.Sansor_Pass_idx = element.input - 1
                            if ('condition' in element) info.Sensor_Pass_Condition = element.condition
                        }
                        break
                    case 'Entry_button':
                        if (element === -1) {
                            info.Entry_Btn_idx = -1
                        } else {
                            if ('component_source' in element) info.Entry_Btn_opt = element.component_source
                            if ('input' in element) info.Entry_Btn_idx = element.input - 1
                            if ('condition' in element) info.Entry_Btn_Condition = element.condition
                        }
                        break
                    case 'Exit_button':
                        if (element === -1) {
                            info.Exit_Btn_idx = -1
                        } else {
                            if ('component_source' in element) info.Exit_Btn_opt = element.component_source
                            if ('input' in element) info.Exit_Btn_idx = element.input - 1
                            if ('condition' in element) info.Exit_Btn_Condition = element.condition
                        }
                        break
                    case 'Fire_Alarm_in':
                        if (element === -1) {
                            info.Alarm_In_idx = -1
                        } else {
                            if ('component_source' in element) info.Alarm_In_opt = element.component_source
                            if ('input' in element) info.Alarm_In_idx = element.input - 1
                            if ('condition' in element) info.Allarm_Input_Condition = element.condition
                        }
                        break
                    case 'Entry_relay':
                        if (element === -1) {
                            info.Entry_Rl_idx = -1
                        } else {
                            if ('component_source' in element) info.Entry_Rl_opt = element.component_source
                            if ('input' in element) info.Entry_Rl_idx = element.input - 1
                            if ('relay_mode' in element) info.Entry_Rl_mode = element.relay_mode
                            if ('type' in element) info.Entry_Rl_type = element.type
                            if ('impulse_time' in element) info.Entry_Rl_pulse = element.impulse_time
                            if ('entry_exit_open_durations' in element) info.Entry_Delay = element.entry_exit_open_durations
                        }
                        break
                    case 'Exit_relay':
                        if (element === -1) {
                            info.Exit_Rl_idx = -1
                        } else {
                            if ('component_source' in element) info.Exit_Rl_opt = element.component_source
                            if ('input' in element) info.Exit_Rl_idx = element.input - 1
                            if ('relay_mode' in element) info.Exit_Rl_mode = element.relay_mode
                            if ('type' in element) info.Exit_Rl_type = element.type
                            if ('impulse_time' in element) info.Exit_Rl_pulse = element.impulse_time
                            if ('entry_exit_open_durations' in element) info.Entry_Delay = element.entry_exit_open_durations
                        }
                        break
                    case 'Alarm_out':
                        if (element === -1) {
                            info.Alarm_out_idx = -1
                        } else {
                            if ('component_source' in element) info.Alarm_out_opt = element.component_source
                            if ('output' in element) info.Alarm_out_idx = element.output - 1
                            if ('impulse_time' in element) info.Alarm_out_tm = element.impulse_time
                            if ('relay_mode' in element) info.Alarm_mod = element.relay_mode
                            if ('type' in element) info.Alarm_out_mod = element.type
                        }
                        break
                    case 'Block_Turnstile':
                        if (element === -1) {
                            info.BlockEnt_Rl_idx = -1
                        } else {
                            if ('component_source' in element) info.BlockEnt_Rl_opt = element.component_source
                            if ('output' in element) info.BlockEnt_Rl_idx = element.output - 1
                            if ('impulse_time' in element) info.BlockEnt_Rl_pulse = element.impulse_time
                            if ('relay_mode' in element) info.BlockEnt_Rl_mode = element.relay_mode
                            if ('type' in element) info.BlockEnt_Rl_type = element.type
                        }
                        break
                    case 'Emergency_open':
                        if (element === -1) {
                            info.FreeEnt_Rl_idx = -1
                        } else {
                            if ('component_source' in element) info.FreeEnt_Rl_opt = element.component_source
                            if ('output' in element) info.FreeEnt_Rl_idx = element.output - 1
                            if ('impulse_time' in element) info.FreeEnt_Rl_pulse = element.impulse_time
                            if ('relay_mode' in element) info.FreeEnt_Rl_mode = element.relay_mode
                            if ('type' in element) info.FreeEnt_Rl_type = element.type
                        }
                        break

                    default:
                        break
                }
            }
        }

        info = this.settingReaders(message.data, info)
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

        let info: any = {
            Control_point_idx: message.data.id
            // Loop_Ready_idx: -1,
            // Open_Btn_idx: -1,
            // Alarm_In_idx: -1,
            // Lock_Relay_idx: -1
        }
        const resources = message.data.resourcesForSendDevice
        if (resources) {
            // info.Loop_Ready_idx = -1
            // info.Open_Btn_idx = -1
            // info.Alarm_In_idx = -1
            // info.Lock_Relay_idx = -1
            // info.Leaving_Zone = -1
            // info.Came_To_Zone = -1

            for (const resource in resources) {
                const element = resources[resource]
                switch (resource) {
                    case 'Loop_sensor':

                        if (element === -1) {
                            info.Loop_Ready_idx = -1
                        } else {
                            if ('component_source' in element) info.Loop_Ready_opt = element.component_source
                            if ('input' in element) info.Loop_Ready_idx = element.input - 1
                            if ('condition' in element) info.Loop_Ready_Condition = element.condition
                        }
                        break
                    case 'Open_button':
                        if (element === -1) {
                            info.Open_Btn_idx = -1
                        } else {
                            if ('component_source' in element) info.Open_Btn_opt = element.component_source
                            if ('input' in element) info.Open_Btn_idx = element.input - 1
                            if ('condition' in element) info.Open_Btn_Condition = element.condition
                        }
                        break
                    case 'Fire_Alarm_in':
                        if (element === -1) {
                            info.Alarm_In_idx = -1
                        } else {
                            if ('component_source' in element) info.Alarm_In_opt = element.component_source
                            if ('input' in element) info.Alarm_In_idx = element.input - 1
                            if ('condition' in element) info.Alarm_In_Condition = element.condition
                        }
                        break
                    case 'Open_relay':
                        if (element === -1) {
                            info.Lock_Relay_idx = -1
                        } else {
                            if ('component_source' in element) info.Lock_Relay_opt = element.component_source
                            if ('output' in element) info.Lock_Relay_idx = element.output - 1
                            if ('relay_mode' in element) info.Door_Lock_mode = element.relay_mode
                            if ('type' in element) info.Door_Lock_type = element.type
                            if ('impulse_time' in element) info.Door_Lock_pulse = element.impulse_time
                            if ('entry_exit_open_durations' in element) info.Door_Delay = element.entry_exit_open_durations
                            if ('door_sensor_autolock' in element) info.Door_Sens_Autolock = element.door_sensor_autolock
                        }
                        break
                    default:
                        break
                }
            }
        }

        info = this.settingReaders(message.data, info)
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

        let info: any = {
            Control_point_idx: message.data.id
        }
        const resources = message.data.resourcesForSendDevice
        if (resources) {
            // info.Door_sens_idx = -1
            // info.Open_Btn_idx = -1
            // info.Alarm_In_idx = -1
            // info.Lock_Relay_idx = -1
            // info.Alarm_out_idx = -1

            for (const resource in resources) {
                const element = resources[resource]
                switch (resource) {
                    case 'Door_sensor':
                        if (element === -1) {
                            info.Door_sens_idx = -1
                        } else {
                            if ('component_source' in element) info.Door_sens_opt = element.component_source
                            if ('input' in element) info.Door_sens_idx = element.input - 1
                            if ('condition' in element) info.Door_sens_Condition = element.condition
                        }
                        break
                    case 'Open_button':
                        if (element === -1) {
                            info.Open_Btn_idx = -1
                        } else {
                            if ('component_source' in element) info.Open_Btn_opt = element.component_source
                            if ('input' in element) info.Open_Btn_idx = element.input - 1
                            if ('condition' in element) info.Open_Btn_Condition = element.condition
                        }
                        break
                    case 'Fire_Alarm_in':
                        if (element === -1) {
                            info.Alarm_In_idx = -1
                        } else {
                            if ('component_source' in element) info.Alarm_In_opt = element.component_source
                            if ('input' in element) info.Alarm_In_idx = element.input - 1
                            if ('condition' in element) info.Allarm_Input_Condition = element.condition
                        }
                        break
                    case 'Lock':
                        if (element === -1) {
                            info.Lock_Relay_idx = -1
                        } else {
                            if ('component_source' in element) info.Lock_Relay_opt = element.component_source
                            if ('output' in element) info.Lock_Relay_idx = element.output - 1
                            if ('relay_mode' in element) info.Door_Lock_mode = element.relay_mode
                            if ('type' in element) info.Door_Lock_type = element.type
                            if ('impulse_time' in element) info.Door_Lock_pulse = element.impulse_time
                            if ('entry_exit_open_durations' in element) info.Door_Delay = element.entry_exit_open_durations
                            if ('door_sensor_autolock' in element) info.Door_Sens_Autolock = element.door_sensor_autolock
                        }
                        break
                    case 'Alarm_out':
                        if (element === -1) {
                            info.Alarm_out_idx = -1
                        } else {
                            if ('component_source' in element) info.Alarm_out_opt = element.component_source
                            if ('output' in element) info.Alarm_out_idx = element.output - 1
                            if ('impulse_time' in element) info.Alarm_out_tm = element.impulse_time
                            if ('relay_mode' in element) info.Alarm_mod = element.relay_mode
                            if ('type' in element) info.Alarm_out_mod = element.type
                        }
                        break
                    default:
                        break
                }
            }
        }

        info = this.settingReaders(message.data, info)
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

        let info: any = {
            Control_point_idx: message.data.id
            // Alarm_In_idx: -1,
            // Lock_Relay_idx: -1
        }
        const resources = message.data.resourcesForSendDevice
        if (resources) {
            // info.Alarm_In_idx = -1
            // info.Lock_Relay_idx = -1
            // info.Leaving_Zone = -1
            // info.Came_To_Zone = -1

            for (const resource in resources) {
                const element = resources[resource]
                switch (resource) {
                    case 'Fire_Alarm_in':
                        if (element === -1) {
                            info.Alarm_In_idx = -1
                        } else {
                            if ('component_source' in element) info.Alarm_In_opt = element.component_source
                            if ('input' in element) info.Alarm_In_idx = element.input - 1
                            if ('condition' in element) info.Allarm_Input_Condition = element.condition
                        }
                        break
                    case 'Lock':
                        if (element === -1) {
                            info.Lock_Relay_idx = -1
                        } else {
                            if ('component_source' in element) info.Lock_Relay_opt = element.component_source
                            if ('output' in element) info.Lock_Relay_idx = element.output - 1
                            if ('relay_mode' in element) info.Door_Lock_mode = element.relay_mode
                            if ('type' in element) info.Door_Lock_type = element.type
                            if ('impulse_time' in element) info.Door_Lock_pulse = element.impulse_time
                            if ('entry_exit_open_durations' in element) info.Door_Delay = element.entry_exit_open_durations
                        }
                        break
                    default:
                        break
                }
            }
        }

        info = this.settingReaders(message.data, info)

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

    public static settingReaders (message: any, info: any) {
        if (message.readers) {
            info.Rd0_idx = -1
            info.Rd0_dir = -1
            info.Rd1_idx = -1
            info.Rd1_dir = -1
            info.Rd2_idx = -1
            info.Rd2_dir = -1
            info.Rd3_idx = -1
            info.Rd3_dir = -1
            const readers = message.readers
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
        return info
    }
}
