import { OperatorType } from './Operators'
import { ICrudMqttMessaging } from '../interfaces/messaging.interface'
import ParseCtp from './ParseCtp'
import ParseAcu from './ParseAcu'
import ParseSchedule from './ParseSchedule'
import ParseCardKeys from './ParseCardKeys'
import ParseEvents from './ParseEvents'

export default class ParseCrud {
    public static limit_for_keys_count = 25

    public static crudData (topic: string, message: ICrudMqttMessaging): void {
        switch (message.operator) {
            case OperatorType.PING:
                ParseAcu.ping(message)
                break
            case OperatorType.ACCEPT:
                ParseAcu.accept(message)
                break
            case OperatorType.LOGIN:
                ParseAcu.login(message)
                break
            case OperatorType.CANCEL_REGISTRATION:
                ParseAcu.cancelRegistration(message)
                break
            case OperatorType.LOGOUT:
                ParseAcu.logOut(message)
                break
            case OperatorType.SET_PASS:
                ParseAcu.setPass(message)
                break
            case OperatorType.MAIN_TAIN:
                ParseAcu.mainTain(message)
                break
            case OperatorType.WEB_PASS:
                ParseAcu.webPass(message)
                break
            case OperatorType.SET_NET_SETTINGS:
                ParseAcu.setNetSettings(message)
                break
            case OperatorType.GET_NET_SETTINGS:
                ParseAcu.getNetSettings(message)
                break
            case OperatorType.SET_DATE_TIME:
                ParseAcu.setDateTime(message)
                break
            case OperatorType.SET_MQTT_SETTINGS:
                ParseAcu.setMqttSettings(message)
                break
            case OperatorType.GET_MQTT_SETTINGS:
                ParseAcu.getMqttSettings(message)
                break
            case OperatorType.GET_STATUS_ACU:
                ParseAcu.getStatusAcu(message)
                break
            case OperatorType.SET_EXT_BRD:
                ParseAcu.setExtBrd(message)
                break
            case OperatorType.GET_EXT_BRD:
                ParseAcu.getExtBrd(message)
                break
            case OperatorType.DEL_EXT_BRD:
                ParseAcu.delExtBrd(message)
                break
            case OperatorType.SET_RD:
                ParseAcu.setRd(message)
                break
            case OperatorType.GET_RD:
                ParseAcu.getRd(message)
                break
            case OperatorType.DEL_RD:
                ParseAcu.delRd(message)
                break
            case OperatorType.SET_OUTPUT:
                ParseAcu.setOutput(message)
                break
            case OperatorType.GET_OUTPUT:
                ParseAcu.getOutput(message)
                break
            case OperatorType.GET_INPUT:
                ParseAcu.getInput(message)
                break
            case OperatorType.CARD_PROTECTION:
                ParseAcu.cardProtection(message)
                break
            case OperatorType.SET_CTP_DOOR:
                ParseCtp.setCtpDoor(message)
                break
            case OperatorType.DEL_CTP_DOOR:
                ParseCtp.delCtpDoor(message)
                break
            case OperatorType.GET_CTP_DOOR:
                ParseCtp.getCtpDoor(message)
                break
            case OperatorType.SET_CTP_TURNSTILE:
                ParseCtp.setCtpTurnstile(message)
                break
            case OperatorType.DEL_CTP_TURNSTILE:
                ParseCtp.delCtpTurnstile(message)
                break
            case OperatorType.GET_CTP_TURNSTILE:
                ParseCtp.getCtpTurnstile(message)
                break
            case OperatorType.SET_CTP_GATE:
                ParseCtp.setCtpGate(message)
                break
            case OperatorType.DEL_CTP_GATE:
                ParseCtp.delCtpGate(message)
                break
            case OperatorType.GET_CTP_GATE:
                ParseCtp.getCtpGate(message)
                break
            case OperatorType.SET_CTP_GATEWAY:
                ParseCtp.setCtpGateway(message)
                break
            case OperatorType.DEL_CTP_GATEWAY:
                ParseCtp.delCtpGateway(message)
                break
            case OperatorType.GET_CTP_GATEWAY:
                ParseCtp.getCtpGateway(message)
                break
            case OperatorType.SET_CTP_FLOOR:
                ParseCtp.setCtpFloor(message)
                break
            case OperatorType.DEL_CTP_FLOOR:
                ParseCtp.delCtpFloor(message)
                break
            case OperatorType.GET_CTP_FLOOR:
                ParseCtp.getCtpFloor(message)
                break
            case OperatorType.ACTIVATE_CREDENTIAL:
                ParseCtp.activateCredential(message)
                break

            case OperatorType.SET_EVENTS_MOD:
                ParseEvents.setEventsMod(message)
                break
            case OperatorType.GET_EVENTS_MOD:
                ParseEvents.getEventsMod(message)
                break
            case OperatorType.GET_EVENTS:
                // ParseEvents.getEvents(message)
                break
            case OperatorType.SET_ACCESS_MODE:
                ParseAcu.setAccessMode(message)
                break
            case OperatorType.GET_ACCESS_MODE:
                ParseAcu.getAccessMode(message)
                break
            case OperatorType.SINGLE_PASS:
                ParseAcu.single_pass(message)
                break
            case OperatorType.SET_CARD_KEYS:
                ParseCardKeys.setAddCardKey(message, OperatorType.SET_CARD_KEYS)
                break
            case OperatorType.ADD_CARD_KEY:
                ParseCardKeys.setAddCardKey(message, OperatorType.ADD_CARD_KEY)
                break
            case OperatorType.EDIT_KEY:
                ParseCardKeys.editKey(message)
                break
            case OperatorType.DELL_KEYS:
                ParseCardKeys.dellKeys(message)
                break
            case OperatorType.DELL_ALL_KEYS:
                ParseCardKeys.dellAllKeys(message)
                break
            case OperatorType.SET_SDL_DAILY:
                ParseSchedule.setSdlDaily(message)
                break
            case OperatorType.DEL_SDL_DAILY:
                ParseSchedule.delSdlDaily(message)
                break
            case OperatorType.SET_SDL_WEEKLY:
                ParseSchedule.setSdlWeekly(message)
                break
            case OperatorType.DEL_SDL_WEEKLY:
                ParseSchedule.delSdlWeekly(message)
                break
            case OperatorType.SET_SDL_FLEXI_TIME:
                ParseSchedule.setSdlFlexiTime(message)
                break
            case OperatorType.ADD_DAY_FLEXI_TIME:
                ParseSchedule.addDayFlexiTime(message)
                break
            case OperatorType.END_SDL_FLEXI_TIME:
                ParseSchedule.endSdlFlexiTime(message)
                break
            case OperatorType.DEL_SDL_FLEXI_TIME:
                ParseSchedule.delSdlFlexiTime(message)
                break
            case OperatorType.DEL_DAY_FLEXI_TIME:
                ParseSchedule.delDayFlexiTime(message)
                break
            case OperatorType.SET_SDL_SPECIFIED:
                ParseSchedule.setSdlSpecified(message)
                break
            case OperatorType.ADD_DAY_SPECIFIED:
                ParseSchedule.addDaySpecified(message)
                break
            case OperatorType.END_SDL_SPECIFIED:
                ParseSchedule.endSdlSpecified(message)
                break
            case OperatorType.DEL_SDL_SPECIFIED:
                ParseSchedule.delSdlSpecified(message)
                break
            case OperatorType.DELL_DAY_SPECIFIED:
                ParseSchedule.dellDaySpecified(message)
                break
            case OperatorType.SET_SDL_ORDINAL:
                ParseSchedule.setSdlOrdinal(message)
                break
            case OperatorType.DEL_SDL_ORDINAL:
                ParseSchedule.delSdlOrdinal(message)
                break
            case OperatorType.SET_DAY_ORDINAL:
                ParseSchedule.setDayOrdinal(message)
                break
            case OperatorType.DEL_DAY_ORDINAL:
                ParseSchedule.delDayOrdinal(message)
                break
            case OperatorType.DELL_SHEDULE:
                ParseSchedule.dellShedule(message)
                break
            case OperatorType.DEV_TEST:
                ParseAcu.devTest(message)
                break
            case OperatorType.SET_TASK:
                ParseAcu.deviceSetTask(message)
                break
            case OperatorType.DEL_TASK:
                ParseAcu.deviceDelTask(message)
                break
            case OperatorType.RESET_APB:
                ParseAcu.deviceResetApb(message)
                break
            default:
                break
        }
    }
}
