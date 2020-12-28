import app from './app'
import config from '../config'
import { logger } from '../../modules/winston/logger'
import MQTTBroker from '../app/mqtt/mqtt'

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
(async () => {
    try {
        await MQTTBroker.init()
        MQTTBroker.subscribe((topic:string, message:string) => {
            console.log(1111, topic, ':--', message.toString())
        })
        MQTTBroker.publishMessage('topic', 'y')
        app.listen(
            config.server.port, () => console.log('APP listening at port %d', config.server.port)
        )
        process.on('SIGINT', async () => {
            try {
                process.exit(0)
            } catch (e) {
                process.exit(1)
            }
        })
    } catch (e) { logger.error('Error:', e) }
})()
