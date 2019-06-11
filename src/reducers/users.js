import { SIGN_IN_SUCCESS, SIGN_OUT } from '../utils/const'

export default function users (state = {}, action) {
    switch(action.type) {
        case SIGN_IN_SUCCESS:
            return action.payload
        case SIGN_OUT:
            return {}
        default: 
            return state
    }
}