import { connect, MqttClient } from 'mqtt'
import { logger } from '../../../modules/winston/logger'
import config from '../../config'
import MessageHandler from '../controller/MessageHandler'
// import { TopicCodes } from './Topics'

export default class MQTTBroker {
    public static client: MqttClient
    public static async init() {
        this.client = connect(config.mqtt)
        this.client.setMaxListeners(Number(config.maxListeners))
        return await new Promise((resolve, reject) => {
            this.client.on('connect', (status: any) => {
                logger.info('MQTT server connected successfully!')
                this.client.subscribe('PING', (err: any) => {
                    if (err) logger.error('subscribe error', err)
                    this.client.publish('PING', 'PONG', (error: any) => {
                        if (error) logger.error('publish error', error)
                    })
                })
                this.subscribeAll()
                resolve(status)
            })
            this.client.on('error', (err: any) => {
                if (err) {
                    logger.error('', err)
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject('MQTT connection timed out!')
                }
            })
        })
    }

    public static publishMessage(topic: string, msg: string, cb?: Function): void {
        // console.log('publishMessage topic', topic, msg)
        this.client.publish(topic, msg, (error: any) => {
            if (error) { logger.error('publish error', error) } else {
                if (cb) {
                    // eslint-disable-next-line standard/no-callback-literal
                    cb(topic, msg)
                }
            }
        })
    }

    public static subscribe(topic: string | number, options: any = {}) {
        this.client.subscribe(topic as string, options, (err: any, granted: any) => {
            if (err) logger.error('subscribe error', err)
            console.log(granted)
        })
    }

    public static unsubscribe(topic: string | number) {
        this.client.unsubscribe(topic as string, (err: any) => {
            if (err) logger.error('subscribe error', err)
        })
    }

    public static getMessage(callback: Function) {
        this.client.on('message', function (topic: string, message: string) {
            if (topic && message) {
                return callback(topic, message.toString())
            }
        })
    }

    private static subscribeAll() {
        // const topicList = Object.values(TopicCodes)
        // for (let i = 0; i < topicList.length; i++) {
        //     const topic = topicList[i]
        //     this.subscribe('topic')
        // }

        this.subscribe('+/+/registration/#', { qos: 2 })
        this.subscribe('mqtt_crud', { qos: 0 })

        // eslint-disable-next-line no-new
        new MessageHandler()
    }
}
