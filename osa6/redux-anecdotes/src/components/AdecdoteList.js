import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState()
    console.log('ssss', anecdotes)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    handleClick={() => store.dispatch(addVote(anecdote.id))}
                    content={anecdote.content}
                    votes={anecdote.votes} />
            )}
        </div>
    )
}

export default AnecdoteList