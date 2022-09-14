import MQTTBroker from './mqtt'
import { OperatorType } from './Operators'
// import { SendTopics } from './Topics'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
// import { acuConnectionType } from '../enums/acuConnectionType.enum'
// import { accessPointType } from '../enums/accessPointType.enum'
// import { scheduleType } from '../enums/scheduleType.enum'
// import { credentialStatus } from '../enums/credentialStatus.enum'
import { handleCallback, ackTimeout } from './ParseAcu'
import { scheduleType } from '../enums/scheduleType.enum'
import { SendTopics } from './Topics'
import { getDayOfYear } from '../functions/util'
export default class ParseSchedule {
    public static setSdlDaily (message: ICrudMqttMessaging): void {
        const topic = message.topic
        const tms: any = {
            TmStart: '0', // 'none'
            TmEnd: '0' // 'none'
        }
        message.data.timeframes.forEach((time: any) => {
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)

            // tms.TmStart = (tms.TmStart === 'none') ? start_time.toString() : `${tms.TmStart};${start_time}`
            // tms.TmEnd = (tms.TmEnd === 'none') ? end_time.toString() : `${tms.TmEnd};${end_time}`
            tms.TmStart = (tms.TmStart === '0' && tms.TmEnd === '0') ? start_time : `${tms.TmStart};${start_time}`
            tms.TmEnd = (tms.TmEnd === '0') ? end_time : `${tms.TmEnd};${end_time}`
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static setSdlWeekly (message: ICrudMqttMessaging): void {
        // console.log('SetSdlWeekly', message)
        const topic = message.topic

        const week_tms: any = {
            Tm1_Start: '0', // 'none'
            Tm1_End: '0', // 'none'
            Tm2_Start: '0', // 'none'
            Tm2_End: '0', // 'none'
            Tm3_Start: '0', // 'none'
            Tm3_End: '0', // 'none'
            Tm4_Start: '0', // 'none'
            Tm4_End: '0', // 'none'
            Tm5_Start: '0', // 'none'
            Tm5_End: '0', // 'none'
            Tm6_Start: '0', // 'none'
            Tm6_End: '0', // 'none'
            Tm7_Start: '0', // 'none'
            Tm7_End: '0' // 'none'
        }

        message.data.timeframes.forEach((time: any) => {
            // console.log(time)
            const start_time: string = dateTimeToSeconds(time.start)
            const end_time: string = dateTimeToSeconds(time.end)
            // if (Number(time.name) === 1) {
            //     week_tms.Tm1_Start = (week_tms.Tm1_Start === 'none') ? start_time.toString() : `${week_tms.Tm1_Start};${start_time}`
            //     week_tms.Tm1_End = (week_tms.Tm1_End === 'none') ? end_time.toString() : `${week_tms.Tm1_End};${end_time}`
            // }
            // if (Number(time.name) === 2) {
            //     week_tms.Tm2_Start = (week_tms.Tm2_Start === 'none') ? start_time.toString() : `${week_tms.Tm2_Start};${start_time}`
            //     week_tms.Tm2_End = (week_tms.Tm2_End === 'none') ? end_time.toString() : `${week_tms.Tm2_End};${end_time}`
            // }
            // if (Number(time.name) === 3) {
            //     week_tms.Tm3_Start = (week_tms.Tm3_Start === 'none') ? start_time.toString() : `${week_tms.Tm3_Start};${start_time}`
            //     week_tms.Tm3_End = (week_tms.Tm3_End === 'none') ? end_time.toString() : `${week_tms.Tm3_End};${end_time}`
            // }
            // if (Number(time.name) === 4) {
            //     week_tms.Tm4_Start = (week_tms.Tm4_Start === 'none') ? start_time.toString() : `${week_tms.Tm4_Start};${start_time}`
            //     week_tms.Tm4_End = (week_tms.Tm4_End === 'none') ? end_time.toString() : `${week_tms.Tm4_End};${end_time}`
            // }
            // if (Number(time.name) === 5) {
            //     week_tms.Tm5_Start = (week_tms.Tm5_Start === 'none') ? start_time.toString() : `${week_tms.Tm5_Start};${start_time}`
            //     week_tms.Tm5_End = (week_tms.Tm5_End === 'none') ? end_time.toString() : `${week_tms.Tm5_End};${end_time}`
            // }
            // if (Number(time.name) === 6) {
            //     week_tms.Tm6_Start = (week_tms.Tm6_Start === 'none') ? start_time.toString() : `${week_tms.Tm6_Start};${start_time}`
            //     week_tms.Tm6_End = (week_tms.Tm6_End === 'none') ? end_time.toString() : `${week_tms.Tm6_End};${end_time}`
            // }
            // if (Number(time.name) === 7) {
            //     week_tms.Tm7_Start = (week_tms.Tm7_Start === 'none') ? start_time.toString() : `${week_tms.Tm7_Start};${start_time}`
            //     week_tms.Tm7_End = (week_tms.Tm7_End === 'none') ? end_time.toString() : `${week_tms.Tm7_End};${end_time}`
            // }
            if (Number(time.name) >= 1 && Number(time.name) <= 7) {
                const start_time_key = `Tm${time.name}_Start`
                const end_time_key = `Tm${time.name}_End`
                week_tms[start_time_key] = (week_tms[start_time_key] === '0' && week_tms[end_time_key] === '0') ? start_time : `${week_tms[start_time_key]};${start_time}`
                week_tms[end_time_key] = (week_tms[end_time_key] === '0') ? end_time : `${week_tms[end_time_key]};${end_time}`
            }
        })
        const info = {
            Shedule_id: message.data.id,
            Ctp_idx: message.data.access_point,
            ...week_tms
        }

        console.log('555555555', message.data)
        if (message.data.start_date) info.Start_date = Math.floor(new Date(message.data.start_date).getTime() / 1000)
        if (message.data.end_date) info.Expiration_date = Math.floor(new Date(message.data.end_date).getTime() / 1000)
        console.log('666666666', info.Start_date)

        const send_data: any = {
            operator: OperatorType.SET_SDL_WEEKLY,
            session_id: message.session_id,
            message_id: message.message_id,
            info: info
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static setSdlFlexiTime (message: any): void {
        // console.log('SetSdlFlexiTime', message)
        const topic = message.topic

        const days: any = {}
        message.data.timeframes.forEach((time: any) => {
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)
            if (!days[time.name]) {
                days[time.name] = {
                    TmStart: `${start_time}`,
                    TmEnd: `${end_time}`
                }
            } else {
                days[time.name].TmStart += `;${start_time}`
                days[time.name].TmEnd += `;${end_time}`
            }
        })
        const day_start_time = Math.floor(new Date(message.data.start_from).getTime() / 1000)
        const send_data: any = {
            operator: OperatorType.SET_SDL_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: /* (data.send_data && data.send_data.info.schedule) ? data.send_data.info.schedule : */ message.data.id,
                Ctp_idx: /* (data.send_data && data.send_data.info.access_point) ? data.send_data.info.access_point : */ message.data.access_point,
                DayStart: day_start_time,
                DaysCount: Object.keys(days).length
            }
        }
        message.days = days
        message.days_count = Object.keys(days).length
        // console.log('SetSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static addDayFlexiTime (message: ICrudMqttMessaging): void {
        // console.log('AddDayFlexiTime', message)
        const topic = message.topic

        const days = message.data.days
        const first_key = Object.keys(days)[0]
        const tms: any = days[first_key]
        delete days[first_key]
        message.data.days = days

        const send_data = {
            operator: OperatorType.ADD_DAY_FLEXI_TIME,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.data.id,
                Ctp_idx: message.data.data.access_point,
                Day_idx: first_key,
                ...tms
            }
        }
        // console.log('AddDayFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
            info: {
                Shedule_id: message.data.data.id,
                Ctp_idx: message.data.data.access_point,
                DaysCount: message.data.days_count
            }
        }
        // console.log('EndSdlFlexiTime send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setSdlSpecified (message: any): void {
        // console.log('SetSdlSpecified', message)
        const topic = message.topic

        const days: any = {}
        message.data.timeframes.forEach((time: any) => {
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)
            if (!days[time.name]) {
                days[time.name] = {
                    TmStart: `${start_time}`,
                    TmEnd: `${end_time}`
                }
            } else {
                days[time.name].TmStart += `;${start_time}`
                days[time.name].TmEnd += `;${end_time}`
            }
        })
        message.days = days
        message.days_count = Object.keys(days).length

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

        const days = message.data.days
        const first_key = Object.keys(days)[0]
        const tms: any = days[first_key]
        delete days[first_key]
        message.data.days = days

        const send_data = {
            operator: OperatorType.ADD_DAY_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.data.id,
                Ctp_idx: message.data.data.access_point,
                Day: Math.floor(new Date(first_key).getTime() / 1000),
                ...tms
            }
        }
        // console.log('AddDaySpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
            info: {
                Shedule_id: message.data.data.id,
                Ctp_idx: message.data.data.access_point,
                DaysCount: message.data.days_count
            }
        }
        // console.log('EndSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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
                Shedule_id: message.data.id
                // Ctp_idx: message.data.access_point
            }
        }
        // console.log('delSdlSpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static dellDaySpecified (message: ICrudMqttMessaging): void {
        // console.log('dellDaySpecified', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DELL_DAY_SPECIFIED,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('dellDaySpecified send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setSdlOrdinal (message: any): void {
        // console.log('setSdlOrdinal', message)
        const topic = message.topic

        const days: any = {}
        let start_day: any
        message.data.timeframes.forEach((time: any) => {
            const start_time = dateTimeToSeconds(time.start)
            const end_time = dateTimeToSeconds(time.end)
            const day = getDayOfYear(time.name)
            if (!start_day || day < start_day) start_day = day
            if (!days[day]) {
                days[day] = {
                    Tm1_Start: `${start_time}`,
                    Tm1_End: `${end_time}`
                }
            } else {
                days[day].Tm1_Start += `;${start_time}`
                days[day].Tm1_End += `;${end_time}`
            }
        })
        message.days = days
        message.start_day = start_day
        message.days_count = Object.keys(days).length

        const send_data: any = {
            operator: OperatorType.SET_SDL_ORDINAL,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: /* (data.send_data && data.send_data.info.schedule) ? data.send_data.info.schedule : */ message.data.id,
                Ctp_idx: /* (data.send_data && data.send_data.info.access_point) ? data.send_data.info.access_point : */ message.data.access_point,
                MonthPeriod: message.data.repeat_month
            }
        }
        // console.log('setSdlOrdinal send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }

    public static delSdlOrdinal (message: ICrudMqttMessaging): void {
        // console.log('delSdlOrdinal', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_SDL_ORDINAL,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.id,
                Ctp_idx: message.data.access_point
            }
        }
        // console.log('delSdlOrdinal send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static setDayOrdinal (message: ICrudMqttMessaging): void {
        // console.log('setDayOrdinal', message)
        const topic = message.topic

        const days = message.data.days
        const start_day = message.data.start_day
        const first_key = Object.keys(days)[0]
        const tms: any = days[first_key]
        delete days[first_key]
        message.data.days = days

        const send_data = {
            operator: OperatorType.SET_DAY_ORDINAL,
            session_id: message.session_id,
            message_id: message.message_id,
            info: {
                Shedule_id: message.data.data.id,
                DayId: first_key, // Номер дня в расписании
                Condition_DayWeek: true, // True  - день(число) месяца. False – День недели
                StartDay: start_day, // Дата начала (UNIXTIME)
                ...tms
            }
        }
        // console.log('setDayOrdinal send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleCallback(topic, message) as Function)
        })
    }

    public static delDayOrdinal (message: ICrudMqttMessaging): void {
        // console.log('delDayOrdinal', message)
        const topic = message.topic
        const send_data = {
            operator: OperatorType.DEL_DAY_ORDINAL,
            session_id: message.session_id,
            message_id: message.message_id,
            info: message.data
        }
        // console.log('delDayOrdinal send message', send_data)

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
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

        MQTTBroker.publishMessage(topic, JSON.stringify(send_data), (topic: any, send_message: any) => {
            MQTTBroker.client.on('message', handleSdlUpdateCallback(topic, message) as Function)
        })
    }
}

function handleSdlUpdateCallback (send_topic: any, crud_message: ICrudMqttMessaging): any {
    // setTimeout(() => {
    // MQTTBroker.client.removeListener('message', cb)
    // }, 20000)
    // console.log(12312123)

    const ack_timeout = ackTimeout(send_topic, crud_message, cb, 20000)
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
                if (messageAck.result.errorNo === 0 || messageAck.result.errorNo === 11) {
                    // schedule_type - type of updated schedule
                    if (crud_message.data.schedule_type === scheduleType.DAILY) {
                        crud_message.operator = OperatorType.SET_SDL_DAILY
                        delete crud_message.data.schedule_type
                        ParseSchedule.setSdlDaily(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.WEEKLY) {
                        crud_message.operator = OperatorType.SET_SDL_WEEKLY
                        delete crud_message.data.schedule_type
                        ParseSchedule.setSdlWeekly(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.SPECIFIC) {
                        crud_message.operator = OperatorType.SET_SDL_SPECIFIED
                        delete crud_message.data.schedule_type
                        ParseSchedule.setSdlSpecified(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.FLEXITIME) {
                        crud_message.operator = OperatorType.SET_SDL_FLEXI_TIME
                        delete crud_message.data.schedule_type
                        ParseSchedule.setSdlFlexiTime(crud_message)
                    } else if (crud_message.data.schedule_type === scheduleType.ORDINAL) {
                        crud_message.operator = OperatorType.DEL_SDL_ORDINAL
                        delete crud_message.data.schedule_type
                        ParseSchedule.setSdlOrdinal(crud_message)
                    } else {
                        MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                    }
                } else {
                    MQTTBroker.publishMessage(SendTopics.MQTT_CRUD, JSON.stringify(messageAck))
                }

                MQTTBroker.client.removeListener('message', cb)
                clearTimeout(ack_timeout)
            }
        } catch (e) {

        }
    }
    return cb
}

export function dateTimeToSeconds (time: string) {
    const nums = time.split(':')
    const seconds = 60 * 60 * Number(nums[0]) + 60 * Number(nums[1]) + Number(nums[2])
    return seconds.toString()
}
