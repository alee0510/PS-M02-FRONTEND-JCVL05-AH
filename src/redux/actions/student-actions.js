import Axios from 'axios'
import { GET_STUDENT_DATA, ON_FETCH_START, ON_FETCH_END } from './types'
const API_URL = process.env.REACT_APP_API_URL

// get data
export const getStudentData = (page = 1, limit = 5) => {
    return async (dispatch) => {
        try { 
            dispatch({ type : ON_FETCH_START })

            const { data } = await Axios.get(API_URL +  `/students?_page=${page}&_limit=${limit}`)

            dispatch({ 
                type : GET_STUDENT_DATA, 
                payload : { data : data.data, count : data.total_count } 
            })
            
            dispatch({ type : ON_FETCH_END })
        } catch (error) {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        }
    }
}

// delete data
export const deleteStudent = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type : ON_FETCH_START })

            await Axios.delete(API_URL + `/students/${id}`)
            const { data } = await Axios.get(API_URL + `/students?_page=${1}&_limit=${5}`)
            dispatch({ 
                type : GET_STUDENT_DATA, 
                payload : { data : data.data, count : data.total_count } 
            })
            
            dispatch({ type : ON_FETCH_END })
        } catch (error) {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        }
    }
}

// edit data
export const editStudent = (id, data) => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })
        
        Axios.put(API_URL +  `/students/${id}`, data)
        .then((respond) => {
            Axios.get(API_URL + `/students?_page=${1}&_limit=${5}`)
            .then((respond2) => {
                dispatch({ type : GET_STUDENT_DATA, payload : respond2.data })
                dispatch({ type : ON_FETCH_END })
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
    
}

// sort data
export const sortStudentData = (type = 'asc') => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })
        
        Axios.get(API_URL + `/students?_sort=name&_order=${type}`)
        .then((respond) => {
            dispatch({ type : GET_STUDENT_DATA, payload : respond.data })
            dispatch({ type : ON_FETCH_END })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
}

// post data
export const postStudentData = (body) => {
    return async (dispatch) => {
        try {

        } catch (error) {
            
        }
    }
}