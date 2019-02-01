import React from 'react'

const Person = ({ person, onDelete }) => {
    return (
        <div>
            {person.name} - {person.phone} <button onClick={() => onDelete(person)}>Poista</button>
        </div>
    )
}

export default Person