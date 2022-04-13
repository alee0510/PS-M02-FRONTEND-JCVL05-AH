import { GET_STUDENT_DATA, ON_FETCH_START, ON_FETCH_END } from '../actions/types'

const INITIAL_STATE = {
    data : [],
    count : 0,
    loading : false
}

function studentReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case ON_FETCH_START :
            return { ...state, loading : true }
        case ON_FETCH_END :
            return { ...state, loading : false }
        case GET_STUDENT_DATA :
            return { ...state, data : action.payload.data, count : action.payload.count }
        default :
            return state
    }
} 

export default studentReducer