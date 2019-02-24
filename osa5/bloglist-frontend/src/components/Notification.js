import React from 'react'

const Notification = ({ message }) => {
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

    if (message === null || message.text === null) return null

    if (!message.error) {
        return (
            <div style={style}>{message.text}</div>
        )
    }



    return (
        <div style={errorStyle}>{message.text}</div>
    )
}

export default Notification
