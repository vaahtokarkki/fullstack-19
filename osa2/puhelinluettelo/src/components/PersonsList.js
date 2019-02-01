import React from 'react'

import Person from './Person'

const PersonsList = ({ persons }) => {
    const rows = () => persons.map(p => <Person name={p.name} phone={p.number} key={p.name}/>)
    return (
        <div>
            <h2>Numerot</h2>
            {rows()}
        </div>
    )
}

export default PersonsList