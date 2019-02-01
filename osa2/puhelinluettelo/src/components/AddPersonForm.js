import React from 'react'

const AddPersonForm = ({onSubmit, onNameChange, newName, newPhone, onPhoneChange}) => {
    return (
        <div>
            <h3>Lisää uusi henkilö</h3>
        <form onSubmit={onSubmit}>
            <div>
                nimi: <input value={newName} onChange={onNameChange} /><br />
                numero: <input value={newPhone} onChange={onPhoneChange} />
            </div>
            <div>
                <button type="submit">Lisää</button>
            </div>
        </form>
        </div>
    )
}

export default AddPersonForm