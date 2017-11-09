export const SETTINGS = {
    DEBUG: true,
}

export const ROUTES = {
    ROOT: '/',
    LOGIN: '/login',
    STUDENT_DASHBOARD: '/student-dashboard',
    TEACHER_DASHBOARD: '/teacher-dashboard',
    CLASS_SELECTION: '/class-selection',
    STUDENT_SURVEY: '/student-survey',
    HISTORY: '/history',
    GROUP_MANAGEMENT: '/groups-management',
}

export const BACKEND_API = {
    ROOT: 'https://dlearn-helsinki-backend.herokuapp.com/webapi/',
    GET_STUDENT: ''
}

/*
 * action types
 */
export const CLASS_ACTION_TYPES = {
    SET_CLASSES: 'SET_CLASSES',
    DELETE_CLASSES: 'DELETE_CLASSES'
}

export const GROUP_ACTION_TYPES = {
    FETCH_GROUPS: 'FETCH_GROUPS'
}

export const MODAL_ACTION_TYPES = {
    SET_MODAL: 'SET_MODAL',
    SHOW_MODAL: 'SHOW_MODAL'
}

export const STUDENT_ACTION_TYPES = {
    ADD_STUDENT: 'ADD_STUDENT'
}

export const USER_ACTION_TYPES = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    SET_USER_ID: 'SET_USER_ID',
    SET_USER_NAME: 'SET_USER_NAME',
    SET_USER_TYPE: 'SET_USER_TYPE',
    SET_USER_LOGIN: 'SET_USER_LOGIN',
    SET_USER_HASH: 'SET_USER_HASH',
    SET_USER_CLASS_ID: 'SET_USER_CLASS_ID',
    SET_USER_GROUP_ID: 'SET_USER_GROUP_ID'
}
