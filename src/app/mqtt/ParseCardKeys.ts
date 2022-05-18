import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
import { handleCallback, ackTimeout } from './ParseAcu'
import { generateHexWithBytesLength, getCredentialStatus } from '../functions/util'

export default class ParseCardKeys {
    public static limit_for_keys_count = 25
    public static key_len = 7

    public static setAddCardKey (message: ICrudMqttMessaging, operator: OperatorType.SET_CARD_KEYS | OperatorType.ADD_CARD_KEY): void {
        // console.log('AddCardKey', message)
        const access_points = message.data.access_points
        const cardholders = message.data.cardholders
        const access_point_id = access_points[0].id
        const keys: any = []
        if (!('send_end_card_key' in message.data)) message.data.send_end_card_key = false

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
                for (const credential of cardholder.credentials) {
                    const key_hex = generateHexWithBytesLength(credential.code, credential.facility, this.key_len)

                    const start_date =
                        (cardholder.limitations && cardholder.limitations.valid_from)
                            ? Math.round((new Date(cardholder.limitations.valid_from).getTime()) / 1000)
                            : 0
                    const expiration_date =
                        (cardholder.limitations && cardholder.limitations.valid_due)
                            ? Math.round((new Date(cardholder.limitations.valid_due).getTime()) / 1000)
                            : 0

                    let key_string = '/'
                    key_string += `${credential.id};`
                    key_string += `${access_point_id};`
                    key_string += `${this.key_len};`
                    key_string += `${key_hex};`
                    key_string += `${getCredentialStatus(credential.status)};`
                    key_string += `${access_rule_id};`
                    key_string += '1;' // Kind_key
                    key_string += '0;' // Key_type
                    key_string += '-1;' // Passes
                    key_string += '0;' // First_Use_Counter
                    key_string += '0;' // Last_Use_Counter
                    key_string += `${cardholder.enable_antipass_back ? 1 : 0};` // ABP
                    // key_string += `${cardholder.antipass_backs.time || 0};` // ABP_Time
                    key_string += `${start_date};` // Start_date
                    key_string += `${expiration_date};` // Expiration_date
                    keys.push(key_string)
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

            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                MQTTBroker.client.on('message', handleCardKeyCallback(topic, message) as Function)
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
                KeysCount: message.data.all_credentials_count
            }
        }
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
                        MQTTBroker.client.on('message', handleCardKeyCallback(topic, message) as Function)
                    })
                } else {
                    for (const access_point of access_points) {
                        let access_rule_id = 0
                        for (const access_rule of cardholder.access_rights.access_rules) {
                            if (access_rule.access_point === access_point.id) {
                                access_rule_id = access_rule.id
                            }
                        }

                        if (access_rule_id) {
                            const info: any = {
                                Ctp_id: access_point.id,
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
                            const send_data = {
                                operator: OperatorType.EDIT_KEY,
                                session_id: message.session_id,
                                message_id: message.message_id,
                                info: info
                            }
                            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                                MQTTBroker.client.on('message', handleCardKeyCallback(topic, message) as Function)
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
            let keys = '/'
            for (const cardholder of message.data) {
                keys += `${cardholder.id}/`
            }
            const send_data = {
                operator: OperatorType.DELL_KEYS,
                session_id: message.session_id,
                message_id: message.message_id,
                info: {
                    KeysDataLength: keys.length,
                    Keys_count: cardholders_length,
                    Keys_id: keys
                }
            }
            // console.log('DellKeys send message', send_data)

            MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
            })
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

function handleCardKeyCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
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
                console.log('crud_message', crud_message)

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
