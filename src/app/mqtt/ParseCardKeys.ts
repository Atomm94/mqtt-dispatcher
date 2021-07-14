import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
// import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
// import { acuConnectionType } from '../enums/acuConnectionType.enum'
// import { accessPointType } from '../enums/accessPointType.enum'
// import { scheduleType } from '../enums/scheduleType.enum'
import { credentialStatus } from '../enums/credentialStatus.enum'
import { typeAntipassBack } from '../enums/typeAntipassBack.enum'

import { handleCallback, ackTimeout } from './ParseAcu'

export default class ParseCardKeys {
    public static limit_for_keys_count = 25
    public static setCardKeys (message: ICrudMqttMessaging): void {
        // console.log('setCardKeys', message)
        const access_points = message.data.access_points
        const cardholders = message.data.cardholders
        console.log('data', message.data)

        const access_point_id = access_points[0].id
        const keys: any = []
        const key_len = 4
        for (const cardholder of cardholders) {
            let anti_passback_type = -1
            if (cardholder.antipass_backs) {
                if (cardholder.antipass_backs.type === typeAntipassBack.SOFT) {
                    anti_passback_type = 0
                } else if (cardholder.antipass_backs.type === typeAntipassBack.SEMI_SOFT) {
                    anti_passback_type = 1
                } else if (cardholder.antipass_backs.type === typeAntipassBack.HARD) {
                    anti_passback_type = 2
                } else if (cardholder.antipass_backs.type === typeAntipassBack.EXTRA_HARD) {
                    anti_passback_type = 3
                }
            }
            let access_rule_id = 0
            for (const access_rule of cardholder.access_rights.access_rules) {
                if (access_rule.access_point === access_point_id) {
                    access_rule_id = access_rule.id
                }
            }
            for (const credential of cardholder.credentials) {
                let key_string = '/'
                key_string += `${credential.cardholder};`
                key_string += `${key_len};`
                key_string += `${credential.code};`
                key_string += `${access_rule_id};`
                key_string += `${(credential.status === credentialStatus.ACTIVE) ? 1 : 0};`
                key_string += '1;' // Kind_key
                key_string += '0;' // Key_type
                key_string += '-1;' // Passes
                key_string += '0;' // First_Use_Counter
                key_string += '0;' // Last_Use_Counter
                key_string += `${anti_passback_type};` // ABP
                key_string += `${cardholder.antipass_backs.enable_timer};` // ABP_Time
                key_string += '0;' // Start_date
                key_string += '0;' // Expiration_date
                keys.push(key_string)
            }
        }
        if (!message.data.access_point_sended) message.data.access_point_sended = 0
        if (!message.data.all_keys_count) message.data.all_keys_count = keys.length * access_points.length
        if (!message.data.keys_count) message.data.keys_count = keys.length

        const info: any = {
            Ctp_idx: access_point_id
        }
        const keys_slice = keys.slice(message.data.access_point_sended, message.data.access_point_sended + this.limit_for_keys_count)
        info.Keys = keys_slice.join('') + '/'
        info.KeysCount = keys_slice.length
        info.KeysDataLength = info.Keys.length
        const topic = message.topic
        const send_data = {
            operator: OperatorType.SET_CARD_KEYS,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }
        // console.log('setCardKeys send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCardKeyCallback(topic, message) as Function)
        })
    }

    public static addCardKey (message: ICrudMqttMessaging): void {
        // console.log('AddCardKey', message)
        const access_points = message.data.access_points
        const cardholders = message.data.cardholders
        const access_point_id = access_points[0].id
        const keys: any = []
        const key_len = 4
        for (const cardholder of cardholders) {
            let access_rule_id = 0
            let anti_passback_type = -1
            if (cardholder.antipass_backs.type === typeAntipassBack.SOFT) {
                anti_passback_type = 0
            } else if (cardholder.antipass_backs.type === typeAntipassBack.SEMI_SOFT) {
                anti_passback_type = 1
            } else if (cardholder.antipass_backs.type === typeAntipassBack.HARD) {
                anti_passback_type = 2
            } else if (cardholder.antipass_backs.type === typeAntipassBack.EXTRA_HARD) {
                anti_passback_type = 3
            }
            for (const access_rule of cardholder.access_rights.access_rules) {
                if (access_rule.access_point === access_point_id) {
                    access_rule_id = access_rule.id
                }
            }
            for (const credential of cardholder.credentials) {
                let key_string = '/'
                key_string += `${credential.cardholder};`
                key_string += `${key_len};`
                key_string += `${credential.code};`
                key_string += `${access_rule_id};`
                key_string += `${(credential.status === credentialStatus.ACTIVE) ? 1 : 0};`
                key_string += '1;' // Kind_key
                key_string += '0;' // Key_type
                key_string += '-1;' // Passes
                key_string += '0;' // First_Use_Counter
                key_string += '0;' // Last_Use_Counter
                key_string += `${anti_passback_type};` // ABP
                key_string += `${cardholder.antipass_backs.enable_timer};` // ABP_Time
                key_string += '0;' // Start_date
                key_string += '0;' // Expiration_date
                keys.push(key_string)
            }
        }
        if (!message.data.access_point_sended) message.data.access_point_sended = 0
        if (!message.data.all_keys_count) message.data.all_keys_count = keys.length * access_points.length
        if (!message.data.keys_count) message.data.keys_count = keys.length

        const info: any = {
            Ctp_idx: access_point_id
        }
        const keys_slice = keys.slice(message.data.access_point_sended, message.data.access_point_sended + this.limit_for_keys_count)
        info.Keys = keys_slice.join('') + '/'
        info.KeysCount = keys_slice.length
        info.KeysDataLength = info.Keys.length
        const topic = message.topic
        const send_data = {
            operator: OperatorType.ADD_CARD_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
        }
        // console.log('AddCardKey send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCardKeyCallback(topic, message) as Function)
        })
    }

    public static endCardKey (message: ICrudMqttMessaging): void {
        // console.log('endCardKey', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.END_CARD_KEY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                KeysCount: message.data.all_keys_count
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
                const code = credential.code
                const key_len = 4
                if (message.data.access_rule) {
                    const send_data = {
                        operator: OperatorType.EDIT_KEY,
                        session_id: message.session_id,
                        message_id: message.message_id,
                        info: {
                            Ctp_idx: message.data.access_rule.access_point,
                            Key_id: code,
                            Schedule_id: message.data.access_rule.id,
                            Key_len: key_len
                        }
                    }
                    MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
                        MQTTBroker.client.on('message', handleCardKeyCallback(topic, message) as Function)
                    })
                } else {
                    for (const access_point of access_points) {
                        const info: any = {
                            Ctp_id: access_point.id,
                            Key_id: code
                        }

                        if ('vip' in cardholder) info.Key_type = cardholder.vip ? 2 : 0
                        if ('status' in credential) info.Key_status = credential.status === credentialStatus.ACTIVE ? 1 : 0
                        info.Key_len = key_len
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
    ackTimeout(send_topic, crud_message, cb, 20000)
    function cb (topicAck: any, messageAck: any) {
        try {
            messageAck = JSON.parse(messageAck.toString())
            if (topicAck === `${send_topic.split('/').slice(0, -2).join('/')}/Ack/` && crud_message.message_id === messageAck.message_id && messageAck.operator === `${crud_message.operator}-Ack`) {
                messageAck.send_data = crud_message
                // messageAck.crud_message = crud_message
                messageAck.device_topic = topicAck
                crud_message.data.access_point_sended += ParseCardKeys.limit_for_keys_count
                console.log('crud_message', crud_message)

                if (crud_message.data.access_point_sended >= crud_message.data.keys_count) {
                    crud_message.data.access_points.shift()
                    crud_message.data.access_point_sended = 0
                    if (crud_message.data.access_points.length) {
                        if (crud_message.operator === OperatorType.ADD_CARD_KEY) {
                            ParseCardKeys.addCardKey(crud_message)
                        } else {
                            ParseCardKeys.setCardKeys(crud_message)
                        }
                    } else {
                        ParseCardKeys.endCardKey(crud_message)
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
