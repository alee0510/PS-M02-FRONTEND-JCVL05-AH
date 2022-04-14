import { GET_PROGRAM, GET_PROGRAM_START, GET_PROGRAM_END } from '../actions/types'

const INITIAL_STATE = {
    data : [],
    loading : false
}

export default function programReducer (state =  INITIAL_STATE, action ) {
    switch(action.type) {
        case GET_PROGRAM_START:
            return { ...state, loading : true }
        case GET_PROGRAM_END:
            return { ...state, loading : false }
        case GET_PROGRAM :
            return { ...state, data : action.payload }
        default:
            return state
    }
}