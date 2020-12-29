import * as requestUtil from '../functions/requestUtil'

export default class UserLog {
    public static async saveLog (message:string) {
        requestUtil.postBodyRequest('http://localhost:4142/userLog', JSON.parse(message))
    }
}
