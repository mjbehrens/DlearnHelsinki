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
