import { get, post} from '../utils/api'

const processRequest = (store) => (next) => (action) => {
    if (action.type !== 'ADD_USER')
        return next(action)

    post('http://127.0.0.1:5000/users', action.user)
        .then( result => successfulRequest(result))
        .catch( error => failedRequest())
}

function successfulRequest(result) {
    console.log(result)
}

function failedRequest() {
    console.log('error')
}

export default processRequest