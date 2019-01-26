import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handeClick}) => {
    return (
        <div>
            <button onClick={handeClick}>next anecdote</button>
        </div>
    )
}

const Anecdote = ({text}) => {
    return (
        <div>
            {text}
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const handeClick = () => {
        const max = props.anecdotes.length;
        let next = Math.floor(Math.random() * (max + 1));
        while(next === selected) {
            next = Math.floor(Math.random() * (max + 1));
        }
        console.log("Displaying anecdote: "+next)
        setSelected(next) 
    }

    return (
        <div>
            <Anecdote text={props.anecdotes[selected]} />
            <Button handeClick={handeClick} />
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