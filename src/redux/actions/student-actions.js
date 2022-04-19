import Axios from 'axios'
import { GET_STUDENT_DATA, GET_STUDENT_DATA_START, GET_STUDENT_DATA_END } from './types'
const API_URL = process.env.REACT_APP_API_URL

// get data
export const getStudentData = (page = 1, limit = 5) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_STUDENT_DATA_START })

            // fecth data
            const { data } = await Axios.get(API_URL + `/students?_page=${page}&_limit=${limit}`)
            dispatch({ 
                type : GET_STUDENT_DATA,
                payload : {
                    data : data.data,
                    count : data.total_count
                }
            })

            dispatch({ type : GET_STUDENT_DATA_END })
        } catch (error) {
            console.log(error)
            dispatch({ type : GET_STUDENT_DATA_END })
        }
    }
}

// delete data
export const deleteStudent = (id, page, limit = 5) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_STUDENT_DATA_START })

            // AJAX request to delete data -> soft delete
            const respond = await Axios.delete(API_URL + `/students/soft/${id}`)
            console.log(respond.data)

            // AJAX request to fecth new data
            const { data } = await Axios.get(API_URL + `/students?_page=${page}&_limit=${limit}`)
            dispatch({
                type : GET_STUDENT_DATA,
                payload : {
                    data : data.data,
                    count : data.total_count
                }
            })

            dispatch({ type : GET_STUDENT_DATA_END })

            // return info
            return [true, '']
        } catch (error) {
            console.log(error)
            dispatch({ type : GET_STUDENT_DATA_END })

            // if failed
            return [false, error.response ? error.response.data : error]
        }
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
        try {
            dispatch({ type : GET_STUDENT_DATA_START })

            // AJAX request : POST
            await Axios.post(API_URL + '/students', body)
            
            dispatch({ type : GET_STUDENT_DATA_END })

            return [true, '']
        } catch (error) {
            console.log('error :', error)
            dispatch({ type : GET_STUDENT_DATA_END })
            return [false, error.response ? error.response.data : error]
        }
    }
}