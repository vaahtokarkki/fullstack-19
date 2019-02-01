import React, { useState, useEffect } from 'react'

import AddPersonFrom from './components/AddPersonForm'
import FilterPersons from './components/FilterPersons'
import PersonsList from './components/PersonsList'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    }

    const duplicate = persons.find(p => p.name === person.name)
    if (duplicate) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .updatePerson(duplicate.id, { ...duplicate, number: newPhone })
          .then(res =>
            setPersons(persons.map(p => p.id !== res.id ? p : res))
          )
          .catch(err => {
            alert(`${duplicate.name} oltiin poistettu jo!`)
          })
        clearForm()
      }
      return
    } else {
      personService.create(person)
        .then(res => {
          setPersons(persons.concat(res))
        })
    }
    clearForm()
  }

  const onPersonDelete = id => {
    personService.deletePerson(id)
      .then(res => setPersons(persons.filter(p => p.id !== id)))
      .catch(err => {
        alert(`Henkilö oli jo poistettu!`)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const clearForm = () => {
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
    personService.getAll()
      .then(res => setPersons(res))
  }, [])

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
      <PersonsList persons={filterPersons()} onDelete={onPersonDelete} />
    </div>
  )

}

export default App
