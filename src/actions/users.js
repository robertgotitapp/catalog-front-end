export const ADD_USER = 'ADD_USER'
export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function handleAddUser(user) {
    return (dispatch) => {
        dispatch(addUser(user))
    }
}

