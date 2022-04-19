import { GET_STUDENT_DATA, GET_STUDENT_DATA_START, GET_STUDENT_DATA_END } from '../actions/types'

const INITIAL_STATE = {
    data : [],
    count : 0, // total data
    loading : false
}

function studentReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_STUDENT_DATA_START :
            return { ...state, loading : true }
        case GET_STUDENT_DATA_END :
            return { ...state, loading : false }
        case GET_STUDENT_DATA :
            return { 
                ...state, 
                data : action.payload.data, 
                count : action.payload.count 
            }
        default :
            return state
    }
} 

export default studentReducer