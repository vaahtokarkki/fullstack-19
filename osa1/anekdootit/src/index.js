import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Anecdote = ({ text, votes }) => {
    return (
        <div>
            {text}<br />
            has {votes} votes
        </div>
    )
}

const Statistics = ({ maxVotes, anecdote }) => {
    if(maxVotes <= 0) return null
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <Anecdote text={anecdote} votes={maxVotes} />
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
    const [maxVotes, setMaxVotes] = useState({votes:0, anecdote: null})

    const handleNext = () => {
        const max = props.anecdotes.length - 1;
        let next = Math.floor(Math.random() * (max + 1));
        while (next === selected) {
            next = Math.floor(Math.random() * (max + 1));
        }
        console.log("Displaying anecdote: " + next)
        setSelected(next)
    }

    const handleVote = () => {
        const copy = { ...votes }
        copy[selected] += 1
        if(copy[selected] > maxVotes.votes){
            const newMax = {
                votes: copy[selected],
                anecdote: selected
            }
            setMaxVotes(newMax)
        } 
        setVotes(copy)
    }


    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
            <div>
                <Button handleClick={handleNext} text={"next anecdote"} />
                <Button handleClick={handleVote} text={"vote!"} />
            </div>
            <Statistics maxVotes={maxVotes.votes} anecdote={props.anecdotes[maxVotes.votes]} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)