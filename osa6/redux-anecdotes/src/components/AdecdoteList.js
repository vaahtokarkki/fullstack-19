import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes

    const handleVote = anecdote => {
        props.addVote(anecdote.id)
        props.notificationChange(`you voted '${anecdote.content}'`)
        setTimeout(() => {
            props.notificationChange(null)
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    handleClick={() => handleVote(anecdote)}
                    content={anecdote.content}
                    votes={anecdote.votes} />
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
    return {
        anecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    addVote, notificationChange
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes