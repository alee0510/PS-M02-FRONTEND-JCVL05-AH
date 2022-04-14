import { GET_CITY, GET_CITY_START, GET_CITY_END } from '../actions/types'

const INITIAL_STATE = {
    data : [],
    loading : false
}

export default function cityReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_CITY_START :
            return { ...state, loading : true }
        case GET_CITY_END :
            return { ...state, loading : false }
        case GET_CITY :
            return { ...state, data : action.payload }
        default : 
            return state
    }
}