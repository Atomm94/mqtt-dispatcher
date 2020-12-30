import config from '../../config'
import * as requestUtil from '../functions/requestUtil'

export default class UserLog {
    public static async saveLog (message:string) {
        requestUtil.postBodyRequest(`${config.logs.url}/userLog`, JSON.parse(message))
    }
}
