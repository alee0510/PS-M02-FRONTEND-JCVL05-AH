import Axios from 'axios'
import { GET_PROGRAM, GET_PROGRAM_START, GET_PROGRAM_END } from './types'
const API_URL = process.env.REACT_APP_API_URL

// get data
export const getProgram = () => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_PROGRAM_START })

            // AJAX request
            const { data } = await Axios.get(API_URL + `/programs`)
            dispatch({ type : GET_PROGRAM, payload : data.data })

            dispatch({ type : GET_PROGRAM_END })
        } catch (error) {
            console.log('error : ', error)
            dispatch({ type : GET_PROGRAM_END })
        }
    }
}