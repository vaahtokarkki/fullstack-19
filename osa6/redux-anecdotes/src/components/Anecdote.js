import React from 'react';

const Anecdote = ({ handleClick, votes, content }) => {

    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )

}

export default Anecdote