import { connect } from 'mqtt'
import { logger } from '../../../modules/winston/logger'

const protocol: string = process.env.MQTT_VHOST || 'wxs'
const host: string = process.env.MQTT_HOST || '158.85.225.154'
const port: number = Number(process.env.MQTT_PORT) || 1883
const username: string = process.env.MQTT_USERNAME || 'unimacs'
const password: string = process.env.MQTT_PASSWORD || 'tThc7W7DFv'

export default class MQTTBroker {
    static client: any = null
    static async init () {
        this.client = connect({
            protocol: protocol,
            host: host,
            port: port,
            username: username,
            password: password
        })
        return await new Promise((resolve, reject) => {
            this.client.on('connect', (status:any) => {
                logger.info('MQTT server connected successfully!')
                this.client.subscribe('ping', (err:any) => {
                    if (err) console.log('subscribe error', err)
                    this.client.publish('ping', 'pong', (error:any) => {
                        if (error) console.log('publish error', error)
                    })
                })
                resolve(status)
            })
            this.client.on('error', (err:any) => {
                console.log(err)
                if (err) {
                    logger.error('', err)
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject('MQTT connection timed out!')
                }
            })
        })
    }

    static publishMessage (msg: string, topic: string): void {
        this.client.publish(topic, msg)
    }

    static subscribe (callback: Function) {
        this.client.on('message', function (topic:string, message:string) {
            if (topic && message) {
                return callback(topic, message)
            }
        })
    }
}
