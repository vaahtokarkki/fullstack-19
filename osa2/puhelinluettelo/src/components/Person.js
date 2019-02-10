import React from 'react'

const Person = ({ person, onDelete }) => {
    return (
        <div>
            {person.name} - {person.number} <button onClick={() => onDelete(person)}>Poista</button>
        </div>
    )
}

export default Person