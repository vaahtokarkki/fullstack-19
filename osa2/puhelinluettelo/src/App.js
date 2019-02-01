import React, { useState, useEffect } from 'react'

import AddPersonFrom from './components/AddPersonForm'
import FilterPersons from './components/FilterPersons'
import PersonsList from './components/PersonsList'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newPhone
    }

    const duplicate = persons.find(p => p.name === person.name)
    if (duplicate) {
      alert(`${person.name} on jo luettelossa!`)
      return
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewPhone('')
  }

  const onNameChange = (e) => {
    setNewName(e.target.value)
  }

  const onPhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const onFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const filterPersons = () => persons.filter(p => p.name.toLowerCase().includes(filter))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  },[])
  
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <FilterPersons filter={filter} onFilterChange={onFilterChange} />
      <AddPersonFrom
        onSubmit={handleSubmit}
        onNameChange={onNameChange}
        newName={newName}
        onPhoneChange={onPhoneChange}
        newPhone={newPhone} />
      <PersonsList persons={filterPersons()} />
    </div>
  )

}

export default App
