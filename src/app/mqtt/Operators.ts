export enum OperatorType {
    REGISTRATION = 'registration',
    ACCEPT = 'accept',
    ACCEPT_ACK = 'accept-Ack',
    LOGIN = 'login',
    LOGIN_ACK = 'login-Ack',
    LOGOUT = 'logout',
    LOGOUT_ACK = 'logout-Ack',
    LOGOUT_EVENT = 'logout-event',
    SET_PASS = 'SetPass',
    SET_PASS_ACK = 'SetPass-Ack',
    SET_NET_SETTINGS = 'SetNetSettings',
    SET_NET_SETTINGS_ACK = 'SetNetSettings-Ack',
    GET_NET_SETTINGS = 'GetNetSettings',
    GET_NET_SETTINGS_ACK = 'GetNetSettings-Ack',
    SET_DATE_TIME = 'SetDateTime',
    SET_DATE_TIME_ACK = 'SetDateTime-Ack',
    SET_MQTT_SETTINGS = 'SetMQTTSettings',
    SET_MQTT_SETTINGS_ACK = 'SetMQTTSettings-Ack',
    GET_MQTT_SETTINGS = 'GetMQTTSettings',
    GET_MQTT_SETTINGS_ACK = 'GetMQTTSettings-Ack',
    GET_STATUS_ACU = 'GetStatusACU',
    GET_STATUS_ACU_ACK = 'GetStatusACU-Ack',
    SET_EXT_BRD = 'SetExtBrd',
    SET_EXT_BRD_ACK = 'SetExtBrd-Ack',
    GET_EXT_BRD = 'GetExtBrd',
    GET_EXT_BRD_ACK = 'GetExtBrd-Ack',
    DEL_EXT_BRD = 'DelExtBrd',
    DEL_EXT_BRD_ACK = 'DelExtBrd-Ack',

    SET_RD = 'SetRd',
    SET_RD_ACK = 'SetRd-Ack',
    GET_RD = 'GetRd',
    GET_RD_ACK = 'GetRd-Ack',

    DEL_RD = 'DelRd',
    DEL_RD_ACK = 'DelRd-Ack',

    SET_OUTPUT = 'SetOutput',
    SET_OUTPUT_ACK = 'SetOutput-Ack',
    GET_OUTPUT = 'GetOutput',
    GET_OUTPUT_ACK = 'GetOutput-Ack',
    GET_INPUT = 'GetInput',
    GET_INPUT_ACK = 'GetInput-Ack',
    CARD_PROTECTION = 'CardProtection',

    SET_CTP_DOOR = 'SetCtpDoor',
    SET_CTP_DOOR_ACK = 'SetCtpDoor-Ack',

    GET_CTP_DOOR = 'GetCtpDoor',
    GET_CTP_DOOR_ACK = 'GetCtpDoor-Ack',

    DEL_CTP_DOOR = 'DelCtpDoor',
    DEL_CTP_DOOR_ACK = 'DelCtpDoor-Ack',

    SET_CTP_TURNSTILE = 'SetCtpTurnstile',
    SET_CTP_TURNSTILE_ACK = 'SetCtpTurnstile-Ack',

    GET_CTP_TURNSTILE = 'GetCtpTurnstile',
    GET_CTP_TURNSTILE_ACK = 'GetCtpTurnstile-Ack',

    DEL_CTP_TURNSTILE = 'DelCtpTurnstile',
    DEL_CTP_TURNSTILE_ACK = 'DelCtpTurnstile-Ack',

    SET_CTP_GATE = 'SetCtpGate',
    SET_CTP_GATE_ACK = 'SetCtpGate-Ack',

    GET_CTP_GATE = 'GetCtpGate',
    GET_CTP_GATE_ACK = 'GetCtpGate-Ack',

    DEL_CTP_GATE = 'DelCtpGate',
    DEL_CTP_GATE_ACK = 'DelCtpGate-Ack',

    SET_CTP_GATEWAY = 'SetCtpGateway',
    SET_CTP_GATEWAY_ACK = 'SetCtpGateway-Ack',

    GET_CTP_GATEWAY = 'GetCtpGateway',
    GET_CTP_GATEWAY_ACK = 'GetCtpGateway-Ack',

    DEL_CTP_GATEWAY = 'DelCtpGateway',
    DEL_CTP_GATEWAY_ACK = 'DelCtpGateway-Ack',

    SET_CTP_FLOOR = 'SetCtpFloor',
    SET_CTP_FLOOR_ACK = 'SetCtpFloor-Ack',

    GET_CTP_FLOOR = 'GetCtpFloor',
    GET_CTP_FLOOR_ACK = 'GetCtpFloor-Ack',

    DEL_CTP_FLOOR = 'DelCtpFloor',
    DEL_CTP_FLOOR_ACK = 'DelCtpFloor-Ack',

    SET_EVENTS_MOD = 'SetEventsMod',
    SET_EVENTS_MOD_ACK = 'SetEventsMod-Ack',

    GET_EVENTS_MOD = 'GetEventsMod',
    GET_EVENTS_MOD_ACK = 'GetEventsMod-Ack',

    EVENT = 'Event',
    GET_EVENTS = 'GetEvents',
    GET_EVENTS_ACK = 'GetEvents-Ack',
    SET_ACCESS_MODE = 'SetAccessMode',
    SET_ACCESS_MODE_ACK = 'SetAccessMode-Ack',

    EVENT_LOG = 'EventLog',
    USER_LOG = 'UserLog',

    GET_ACCESS_MODE = 'GetAccessMode',
    GET_ACCESS_MODE_ACK = 'GetAccessMode-Ack',
    SINGLE_PASS = 'Single_pass',
    SINGLE_PASS_ACK = 'Single_pass-Ack',

    SET_CARD_KEYS = 'SetCardKeys',
    SET_CARD_KEYS_ACK = 'SetCardKeys-Ack',
    ADD_CARD_KEY = 'AddCardKey',
    ADD_CARD_KEY_ACK = 'AddCardKey-Ack',
    EDIT_KEY = 'EditKey',
    EDIT_KEY_ACK = 'EditKey-Ack',
    DELL_KEYS = 'DellKeys',
    DELL_KEYS_ACK = 'DellKeys-Ack',
    DELL_ALL_KEYS = 'DellAllKeys',
    DELL_ALL_KEYS_ACK = 'DellAllKeys-Ack',

    SET_SDL_DAILY = 'SetSdlDaily',
    SET_SDL_DAILY_ACK = 'SetSdlDaily-Ack',
    DEL_SDL_DAILY = 'DelSdlDaily',
    DEL_SDL_DAILY_ACK = 'DelSdlDaily-Ack',

    SET_SDL_WEEKLY = 'SetSdlWeekly',
    SET_SDL_WEEKLY_ACK = 'SetSdlWeekly-Ack',
    DEL_SDL_WEEKLY = 'DelSdlWeekly',
    DEL_SDL_WEEKLY_ACK = 'DelSdlWeekly-Ack',

    SET_SDL_FLEXI_TIME = 'SetSdlFlexiTime',
    SET_SDL_FLEXI_TIME_ACK = 'SetSdlFlexiTime-Ack',

    ADD_DAY_FLEXI_TIME = 'AddDayFlexiTime',
    ADD_DAY_FLEXI_TIME_ACK = 'AddDayFlexiTime-Ack',

    END_SDL_FLEXI_TIME = 'EndSdlFlexiTime',
    END_SDL_FLEXI_TIME_ACK = 'EndSdlFlexiTime-Ack',
    DEL_SDL_FLEXI_TIME = 'DelSdlFlexiTime',
    DEL_SDL_FLEXI_TIME_ACK = 'DelSdlFlexiTime-Ack',

    DEL_DAY_FLEXI_TIME = 'DelDayFlexiTime',
    DEL_DAY_FLEXI_TIME_ACK = 'DelDayFlexiTime-Ack',

    SET_SDL_SPECIFIED = 'SetSdlSpecified',
    SET_SDL_SPECIFIED_ACK = 'SetSdlSpecified-Ack',

    ADD_DAY_SPECIFIED = 'AddDaySpecified',
    ADD_DAY_SPECIFIED_ACK = 'AddDaySpecified-Ack',

    END_SDL_SPECIFIED = 'EndSdlSpecified',
    END_SDL_SPECIFIED_ACK = 'EndSdlSpecified-Ack',
    DEL_SDL_SPECIFIED = 'DelSdlSpecified',
    DEL_SDL_SPECIFIED_ACK = 'DelSdlSpecified-Ack',

    DELL_DAY_SPECIFIED = 'DellDaySpecified',
    DELL_DAY_SPECIFIED_ACK = 'DellDaySpecified-Ack',

    DELL_SHEDULE = 'DellShedule',
    DELL_SHEDULE_ACK = 'DellShedule-Ack',

    DEV_TEST = 'DevTest',
    DEV_TEST_ACK = 'DevTest-Ack',
    NOTIFICATION='Notification'
}
