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
    COMPETENCE_WALL: '/competence-wall',
}

export const BACKEND_API = {
    //ROOT: 'https://dlearn-helsinki-backend.herokuapp.com/webapi/',
	ROOT: 'http://localhost:8080/webapi/',
    GET_STUDENT: ''
}

export const ACTION_TYPES = {
    // classReducer
    SET_ALL_CLASSES: 'SET_ALL_CLASSES',
    DELETE_ALL_CLASSES: 'DELETE_ALL_CLASSES',
    ADD_CLASS: 'ADD_CLASS',
    DELETE_CLASS: 'DELETE_CLASS',
    UPDATE_CLASS: 'UPDATE_CLASS',
    
    // groupReducer
    SET_ALL_GROUPS: 'SET_ALL_GROUPS',
    DELETE_ALL_GROUPS: 'DELETE_ALL_GROUPS',
    ADD_GROUP: 'ADD_GROUP',
    DELETE_GROUP: 'DELETE_GROUP',
    UPDATE_GROUP: 'UPDATE_GROUP',
     
    // modalReducer
    SET_MODAL: 'SET_MODAL',
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',

    // studentReducer
    SET_ALL_STUDENTS: 'SET_ALL_STUDENTS',
    DELETE_ALL_STUDENTS: 'DELETE_ALL_STUDENTS',
    ADD_STUDENT: 'ADD_STUDENT',
    DELETE_STUDENT: 'DELETE_STUDENT',
    UPDATE_STUDENT: 'UPDATE_STUDENT',
    
    // surveyReducer
    SET_ALL_SURVEYS: 'SET_ALL_SURVEYS',
    DELETE_ALL_SURVEYS: 'DELETE_ALL_SURVEYS',
    ADD_SURVEY: 'ADD_SURVEY',
    DELETE_SURVEY: 'DELETE_SURVEY',
    UPDATE_SURVEY: 'UPDATE_SURVEY',
    
    // userReducer
    FETCH_USER: 'FETCH_USER',
    FETCH_USER_REJECTED: 'FETCH_USER_REJECTED',
    FETCH_USER_FULFILLED: 'FETCH_USER_FULFILLED',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    SET_USER_ID: 'SET_USER_ID',
    SET_USER_NAME: 'SET_USER_NAME',
    SET_USER_TYPE: 'SET_USER_TYPE',
    SET_USER_LOGIN: 'SET_USER_LOGIN',
    SET_USER_HASH: 'SET_USER_HASH',
    SET_USER_CLASS_ID: 'SET_USER_CLASS_ID',
    SET_USER_GROUP_ID: 'SET_USER_GROUP_ID',

}
