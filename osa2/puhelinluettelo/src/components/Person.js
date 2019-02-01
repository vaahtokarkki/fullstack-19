import React from 'react'

const Person = ({ name, phone, id, onDelete }) => {
    return (
        <div>
            {name} - {phone} <button onClick={() => onDelete(id)}>Poista</button>
        </div>
    )
}

export default Person