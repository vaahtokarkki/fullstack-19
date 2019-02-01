import React from 'react'

import Person from './Person'

const PersonsList = ({ persons, onDelete }) => {
    const rows = () => persons.map(p => <Person name={p.name} phone={p.number} key={p.id} id={p.id} onDelete={onDelete}/>)
    return (
        <div>
            <h2>Numerot</h2>
            {rows()}
        </div>
    )
}

export default PersonsList