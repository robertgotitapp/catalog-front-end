const processRequest = (store) => (next) => (action) => {
    if (!action.promise)
        return next(action)

    const SUCCESS_ACTION = `${action.type}_SUCCESS`
    const FAILED_ACTION = `${action.type}_FAILED`

    return action.promise
        .then((result) => {
            next({
            type: SUCCESS_ACTION,
            payload: result,    
            })
        })
        .catch((err) => {
            next({
                type: FAILED_ACTION,
                payload: err,
            })
        })
}

export default processRequest