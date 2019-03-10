const notificationReducer = (state = { message: null, error: false }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotification = (content) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: {
                    message: null,
                    error: null
                }
            })
        }, 5000)

        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message: content.message,
                error: content.error
            }
        })
    }
}


export default notificationReducer