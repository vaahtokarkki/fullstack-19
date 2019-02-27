import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        store.dispatch(
            createAnecdote(e.target.content.value)
        )
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

export default AnecdoteForm