import { ADD_USER, AUTHENTICATE_USER } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case ADD_USER:
            return state
        case AUTHENTICATE_USER:
            return state
        default: 
            return state
    }
}