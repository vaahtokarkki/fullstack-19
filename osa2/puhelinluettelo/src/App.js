import React, { useState, useEffect } from 'react'

import AddPersonFrom from './components/AddPersonForm'
import FilterPersons from './components/FilterPersons'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState({ error: true, text: null })

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
          .then(res => {
            setPersons(persons.map(p => p.id !== res.id ? p : res))
            setMessage({
              error: false,
              text: `Päivitettiin henkilön ${res.name} tiedot!`
            })
            resetMessage()
          })
          .catch(err => {
            setPersons(persons.filter(p => p.id !== duplicate.id))
            setMessage({
              error: true,
              text: `Henkilön ${person.name} tiedoja ei löydy!`
            })
            resetMessage()
          })
        clearForm()
      }
      return
    } else {
      personService.create(person)
        .then(res => {
          setPersons(persons.concat(res))
          setMessage({
            error: false,
            text: `Lisättiin ${res.name}!`
          })
          resetMessage()
        })
    }
    clearForm()
  }

  const onPersonDelete = person => {
    personService.deletePerson(person.id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage({
          error: false,
          text: `Poistettiin henkilön ${person.name} tiedot!`
        })
        resetMessage()
      })
      .catch(err => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage({
          error: true,
          text: `Henkilön ${person.name} tiedot oli jo poistettu!`
        })
        resetMessage()
      })
  }

  const clearForm = () => {
    setNewName('')
    setNewPhone('')
  }

  const resetMessage = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
    <div className="container">
      <h2>Puhelinluettelo</h2>
      <FilterPersons filter={filter} onFilterChange={onFilterChange} />

      <Notification message={message} />

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
