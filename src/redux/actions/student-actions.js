import Axios from 'axios'
import { GET_STUDENT_DATA, ON_FETCH_START, ON_FETCH_END } from './types'
const API_URL = process.env.REACT_APP_API_URL

// get data
export const getStudentData = (page = 1, limit = 5) => {
    return (dispatch) => {

    }
}

// delete data
export const deleteStudent = (id) => {
    return async (dispatch) => {
        
    }
}

// edit data
export const editStudent = (id, data) => {
    return (dispatch) => {

    }
    
}

// sort data
export const sortStudentData = (type = 'asc') => {
    return (dispatch) => {

    }
}

// post data
export const postStudentData = (body) => {
    return async (dispatch) => {
        
    }
}