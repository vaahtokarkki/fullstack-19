import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteList from './components/AdecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdoteFilter'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initAnecdotes()
  }, [])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div >
  )
}

export default connect(null, { initAnecdotes })(App)
