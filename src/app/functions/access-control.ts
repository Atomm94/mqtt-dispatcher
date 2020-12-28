import { AccessControl as RA } from 'role-acl'
import { logger } from '../../../modules/winston/logger'

export class AccessControl {
    public static ac = new RA()

    public static async GrantAccess () {

        // roles_data.forEach(async (role_data: any) => {
        //     const grant_name = role_data.id.toString()
        //     if (role_data.permissions) {
        //         Object.keys(role_data.permissions).forEach((model: any) => {
        //             Object.keys(role_data.permissions[model].actions).forEach((action: string) => {
        //                 if (role_data.permissions[model].actions[action] === true) {
        //                     this.ac.grant(grant_name)
        //                         .execute(action).on(model)
        //                     // console.log('grant', grant_name, model, action)
        //                 }
        //             })
        //         })
        //     }
        // })
    }

    public static async canAccess (role: string | number, model: string, action: string) {
        if (typeof role === 'number') role = role.toString()
        if (this.ac.hasRole(role)) {
            const permission = await this.ac.can(role).execute(action).on(model)
            return permission.granted
        } else {
            logger.warn(`[Grant] canAccess - role ${role} not found!!`)
            return false
        }
    }
}
