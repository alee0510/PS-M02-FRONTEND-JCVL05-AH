import Axios from "axios"
import { GET_CITY, GET_CITY_START, GET_CITY_END } from './types'
const API_URL = process.env.REACT_APP_API_URL

// get data
export const getCity = () => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_CITY_START })

            const { data } = await Axios.get(API_URL + '/city')
            dispatch({ type : GET_CITY, payload : data.data })

            dispatch({ type : GET_CITY_END })
        } catch (error) {
            console.log(error)
            dispatch({ type : GET_CITY_END })
        }
    }
}