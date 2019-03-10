import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
    const message = props.notification.message
    const error = props.notification.error

    const style = {
        backgroundColor: 'lightgreen',
        color: 'darkgreen',
        border: '2px solid darkgreen',
        padding: 15,
        margin: 20,
        width: '20%'
    }

    const errorStyle = {
        ...style,
        backgroundColor: 'lightcoral',
        color: 'darkred',
        border: '2px solid darkred',
    }

    if (message === null || message === null) return null

    if (!error) {
        return <div style={style}>{message}</div>
    }

    return <div style={errorStyle}>{message}</div>
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(
    mapStateToProps
)(Notification)
