import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        e.persist()
        const anecdoteContent = e.target.content.value
        e.target.content.value = ''
        props.createAnecdote(anecdoteContent)
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