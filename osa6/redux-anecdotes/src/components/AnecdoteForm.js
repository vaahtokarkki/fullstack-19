import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        props.createAnecdote(e.target.content.value)
        e.target.content.value = ''
    }

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={handleSubmit}>
                <div><input name='content' /></div>
                <button type='submit'>create</button>
            </form>
        </div>

    )
}

const mapDispatchToProps = {
    createAnecdote
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)