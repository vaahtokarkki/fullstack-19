const notificationReducer = (state = 'Empty...', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const notificationChange = (notification, time) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: null
            })
        }, time * 1000)

        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
    }
}

export default notificationReducer