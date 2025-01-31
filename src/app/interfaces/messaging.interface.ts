import { OperatorType } from '../mqtt/Operators'

export interface ICrudMqttMessaging {
    operator: OperatorType
    topic: string
    message_id: string
    session_id: string
    update: boolean
    data: any
    user: number | null
}

export interface IDeviceMqttMessaging {
    operator: OperatorType
    message_id: string
    session_id: string
    info:string
    result: {
        errorNo:number,
        description?:string
        time:number,
    }
}

export interface IMqttCrudMessaging extends IDeviceMqttMessaging{
    device_topic:string
}
