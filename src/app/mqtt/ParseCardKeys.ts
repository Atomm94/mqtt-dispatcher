import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
import { handleCallback, ackTimeout } from './ParseAcu'
import { generateHexWithBytesLength, getCredentialStatus } from '../functions/util'
import { keyType } from '../enums/keyType.enum'
import { guestKeyType } from '../enums/guestKeyType.enum'
import { guestPeriod } from '../enums/guestPeriod.enum'
import moment from 'moment'

export default class ParseCardKeys {
    public static limit_for_keys_count = 25
    public static key_len = 7

    public static setAddCardKey (message: ICrudMqttMessaging, operator: OperatorType.SET_CARD_KEYS | OperatorType.ADD_CARD_KEY): void {
        // console.log('AddCardKey', message)
        const access_points = message.data.access_points
        const cardholders = message.data.cardholders
        if (access_points.slice(-1)[0].id !== 0) access_points.push({ id: 0 })
        const access_point_id = access_points[0].id
        const check_access_point_in_this_acu = (access_points[0].acu === message.data.acu_id)
        const keys: any = []
        if (!('send_end_card_key' in message.data)) message.data.send_end_card_key = false
        if (!message.data.keys_from_other_devices) message.data.keys_from_other_devices = {}
        if (!message.data.keys_sended_for_this_device) message.data.keys_sended_for_this_device = {}
        if (!message.data.keys_count_for_end_card_key) message.data.keys_count_for_end_card_key = 0

        if (access_point_id === 0) {
            for (const key_from_other_devices in message.data.keys_from_other_devices) {
                if (!message.data.keys_sended_for_this_device[key_from_other_devices]) {
                    keys.push(message.data.keys_from_other_devices[key_from_other_devices])
                }
            }
            // keys = Object.values(message.data.keys_from_other_devices)
        } else {
            for (const cardholder of cardholders) {
                // let anti_passback_type = -1
                // if (cardholder.antipass_backs) {
                //     if (cardholder.antipass_backs.type === typeAntipassBack.SOFT) {
                //         anti_passback_type = 0
                //     } else if (cardholder.antipass_backs.type === typeAntipassBack.SEMI_SOFT) {
                //         anti_passback_type = 1
                //     } else if (cardholder.antipass_backs.type === typeAntipassBack.HARD) {
                //         anti_passback_type = 2
                //     } else if (cardholder.antipass_backs.type === typeAntipassBack.EXTRA_HARD) {
                //         anti_passback_type = 3
                //     }
                // }
                let access_rule_id = 0
                for (const access_rule of cardholder.access_rights.access_rules) {
                    if (access_rule.access_point === access_point_id) {
                        access_rule_id = access_rule.id
                        break
                    }
                }

                if (access_rule_id) {
                    let passes = 0
                    let first_use_counter = 0
                    let last_use_counter = 0
                    if (cardholder.limitations) {
                        if (!cardholder.limitations.pass_counter_enable) {
                            passes = -1
                        } else if (cardholder.limitations.pass_counter_passes) {
                            passes = cardholder.limitations.pass_counter_passes
                        }

                        if (!cardholder.limitations.first_use_counter_enable) {
                            first_use_counter = -1
                        } else if (cardholder.limitations.first_use_counter_days) {
                            first_use_counter = cardholder.limitations.first_use_counter_days
                        }

                        if (!cardholder.limitations.last_use_counter_enable) {
                            last_use_counter = -1
                        } else if (cardholder.limitations.last_use_counter_days) {
                            last_use_counter = cardholder.limitations.last_use_counter_days
                        }
                    }

                    let start_date =
                        (cardholder.limitations && cardholder.limitations.valid_from)
                            ? Math.round((new Date(cardholder.limitations.valid_from).getTime()) / 1000)
                            : 0
                    let expiration_date =
                        (cardholder.limitations && cardholder.limitations.valid_due)
                            ? Math.round((new Date(cardholder.limitations.valid_due).getTime()) / 1000)
                            : 0

                    let key_type = keyType.REGULAR_KEY
                    if (cardholder.guest) {
                        if (cardholder.key_type === guestKeyType.TEMPORARY) {
                            key_type = keyType.GUEST_TEMPORARY_KEY
                            const startDate = `${moment(cardholder.start_date).format('YYYY-MM-DD')} ${cardholder.start_time}`
                            start_date = expiration_date = Math.round(new Date(startDate).getTime() / 1000)
                            if (cardholder.period === guestPeriod.HOURS) {
                                const end_date_timestamp = new Date(startDate).getTime() + cardholder.duration * 60 * 1000
                                expiration_date = Math.round(end_date_timestamp / 1000)
                            } else {
                                const endDate = `${moment(cardholder.end_date).format('YYYY-MM-DD')} ${cardholder.end_time}`
                                expiration_date = Math.round(new Date(endDate).getTime() / 1000)
                            }
                        } else if (cardholder.key_type === guestKeyType.PERMANENT) {
                            key_type = keyType.GUEST_PERMANENT_KEY
                        }
                    }

                    for (const credential of cardholder.credentials) {
                        const key_hex = generateHexWithBytesLength(credential.code, credential.facility, this.key_len)

                        let key_string = '/'
                        key_string += `${credential.id};`
                        key_string += `${check_access_point_in_this_acu ? access_point_id : 0};`
                        key_string += `${this.key_len};`
                        key_string += `${key_hex};`
                        key_string += `${getCredentialStatus(credential.status)};`
                        key_string += `${check_access_point_in_this_acu ? access_rule_id : 0};`
                        key_string += '1;' // Kind_key
                        key_string += `${key_type};` // Key_type
                        key_string += `${passes};` // Passes
                        key_string += `${first_use_counter};` // First_Use_Counter
                        key_string += `${last_use_counter};` // Last_Use_Counter
                        key_string += `${cardholder.enable_antipass_back ? 1 : 0};` // ABP
                        // key_string += `${cardholder.antipass_backs.time || 0};` // ABP_Time
                        key_string += `${start_date};` // Start_date
                        key_string += `${expiration_date};` // Expiration_date

                        if (check_access_point_in_this_acu) {
                            keys.push(key_string)
                            message.data.keys_sended_for_this_device[key_hex] = true
                        } else {
                            message.data.keys_from_other_devices[key_hex] = key_string
                        }
                    }
                }
            }
        }
        if (!message.data.access_point_sended) message.data.access_point_sended = 0
        if (!message.data.all_keys_count) message.data.all_keys_count = keys.length * access_points.length
        // if (!message.data.keys_count) message.data.keys_count = keys.length
        message.data.keys_count = keys.length

        if (!keys.length) {
            message.data.access_points.shift()
            if (message.data.access_points.length) {
                this.setAddCardKey(message, operator)
            } else {
                if (message.data.send_end_card_key) {
                    this.endCardKey(message)
                }
            }
        } else {
            const info: any = {
                Ctp_idx: access_point_id
            }
            const keys_slice = keys.slice(message.data.access_point_sended, message.data.access_point_sended + this.limit_for_keys_count)
            info.Keys = keys_slice.join('') + '/'
            info.KeysCount = keys_slice.length
            info.KeysDataLength = info.Keys.length
            const topic = message.topic
            const send_data = {
                operator: operator,
                session_id: message.session_id,
                message_id: message.message_id,
                info: info
            }
            // console.log('AddCardKey send message', send_data)
            message.data.KeysCount = info.KeysCount

            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                MQTTBroker.client.on('message', handleSetAddCardKeyCallback(topic, message) as Function)
            })
        }
    }

    public static endCardKey (message: ICrudMqttMessaging): void {
        // console.log('endCardKey', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.END_CARD_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                // KeysCount: message.data.all_credentials_count
                KeysCount: message.data.keys_count_for_end_card_key
            }
        }
        message.operator = OperatorType.END_CARD_KEY
        // console.log('endCardKey send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static editKey (message: ICrudMqttMessaging): void {
        // console.log('EditKey', message)
        const topic = message.topic
        // console.log('EditKey send message', send_data)
        const access_points = message.data.access_points
        const cardholders = message.data.cardholders
        const keys_from_other_devices: any = {}
        const keys_sended_for_this_device: any = {}
        for (const cardholder of cardholders) {
            for (const credential of cardholder.credentials) {
                const key_hex = generateHexWithBytesLength(credential.code, credential.facility, this.key_len)

                if (message.data.access_rule) {
                    const send_data = {
                        operator: OperatorType.EDIT_KEY,
                        session_id: message.session_id,
                        message_id: message.message_id,
                        info: {
                            Ctp_idx: message.data.access_rule.access_point,
                            Key_id: credential.id,
                            Key: key_hex,
                            Schedule_id: message.data.access_rule.id,
                            Key_len: this.key_len
                        }
                    }
                    MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                        MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
                    })
                } else {
                    for (const access_point of access_points) {
                        const check_access_point_in_this_acu = (access_point.acu === message.data.acu_id)
                        let access_rule_id = 0
                        for (const access_rule of cardholder.access_rights.access_rules) {
                            if (access_rule.access_point === access_point.id) {
                                access_rule_id = access_rule.id
                            }
                        }

                        if (access_rule_id) {
                            const info: any = {
                                Ctp_id: check_access_point_in_this_acu ? access_point.id : 0,
                                Key_id: credential.id,
                                Key: key_hex
                            }

                            if ('vip' in cardholder) info.Key_type = cardholder.vip ? 2 : 0
                            if ('status' in credential) {
                                if (credential.isDelete) {
                                    info.Key_status = -1
                                } else {
                                    info.Key_status = getCredentialStatus(credential.status)
                                }
                            }

                            info.Key_len = this.key_len

                            if (check_access_point_in_this_acu) {
                                const send_data = {
                                    operator: OperatorType.EDIT_KEY,
                                    session_id: message.session_id,
                                    message_id: message.message_id,
                                    info: info
                                }
                                MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                                    MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
                                })
                                keys_sended_for_this_device[key_hex] = true
                            } else {
                                keys_from_other_devices[key_hex] = info
                            }
                        }
                    }
                    for (const key_from_other_devices in keys_from_other_devices) {
                        if (!keys_sended_for_this_device[key_from_other_devices]) {
                            const send_with_ctp_id_0 = keys_from_other_devices[key_from_other_devices]
                            const send_data = {
                                operator: OperatorType.EDIT_KEY,
                                session_id: message.session_id,
                                message_id: message.message_id,
                                info: send_with_ctp_id_0
                            }
                            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                                MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
                            })
                        }
                    }
                }
            }
        }
    }

    public static dellKeys (message: ICrudMqttMessaging): void {
        // console.log('DellKeys', message)
        const topic = message.topic
        const cardholders = message.data
        const cardholders_length = cardholders.length
        if (cardholders_length) {
            const keys = []
            for (const cardholder of message.data) {
                for (const credential of cardholder.credentials) {
                    keys.push(`/${credential.id}`)
                }
            }

            if (keys.length) {
                if (!message.data.keys_sended) message.data.keys_sended = 0
                message.data.keys_count = keys.length

                const keys_slice = keys.slice(message.data.keys_sended, message.data.keys_sended + this.limit_for_keys_count)
                const keys_str = keys_slice.join('') + '/'

                const send_data = {
                    operator: OperatorType.DELL_KEYS,
                    session_id: message.session_id,
                    message_id: message.message_id,
                    info: {
                        KeysDataLength: keys_str.length,
                        Keys_count: keys_slice.length,
                        Keys_id: keys_str
                    }
                }
                // console.log('DellKeys send message', send_data)

                MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                    MQTTBroker.client.on('message', handleDellKeysCallback(topic, message) as Function)
                })
            }
        }
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }
}

function handleSetAddCardKeyCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
    // setTimeout(() => {
    // MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    // console.log(12312123)
    const ack_timeout = ackTimeout(send_topic, crud_message, cb, 20000)

    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                messageAck.send_data = crud_message
                crud_message.data.send_end_card_key = true
                // messageAck.crud_message = crud_message
                messageAck.device_topic = topicAck
                crud_message.data.access_point_sended += ParseCardKeys.limit_for_keys_count
                // console.log('crud_message', crud_message)
                crud_message.data.keys_count_for_end_card_key += crud_message.data.KeysCount

                if (crud_message.data.access_point_sended >= crud_message.data.keys_count) {
                    crud_message.data.access_points.shift()
                    crud_message.data.access_point_sended = 0
                }
                if (crud_message.data.access_points.length) {
                    ParseCardKeys.setAddCardKey(crud_message, crud_message.operator as OperatorType.SET_CARD_KEYS | OperatorType.ADD_CARD_KEY)
                } else {
                    ParseCardKeys.endCardKey(crud_message)
                }

                MQTTBroker.client.removeListener('message', cb)
                clearTimeout(ack_timeout)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return cb
}

function handleDellKeysCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
    const ack_timeout = ackTimeout(send_topic, crud_message, cb, 20000)

    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                messageAck.send_data = crud_message
                // messageAck.crud_message = crud_message
                messageAck.device_topic = topicAck
                crud_message.data.keys_sended += ParseCardKeys.limit_for_keys_count
                // console.log('handleDellKeysCallback crud_message', crud_message)

                if (crud_message.data.keys_sended < crud_message.data.keys_count) {
                    ParseCardKeys.dellKeys(crud_message)
                }

                MQTTBroker.client.removeListener('message', cb)
                clearTimeout(ack_timeout)
            }
        } catch (e) {
            console.log(e)
        }
    }
    return cb
}
