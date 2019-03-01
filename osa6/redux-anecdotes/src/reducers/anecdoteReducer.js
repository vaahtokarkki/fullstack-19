import anecdoteService from "../services/anecdoteService";

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VOTE':
      const updatedAnecdote = action.data
      const updatedState = state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
      return sortAnecdotes(updatedState)
    case 'NEW_ANECDOTE':
      return sortAnecdotes(state.concat(action.data))
    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data)
    default:
      return state
  }
}

export const addVote = (anecdote) => {

  return async dispatch => {
    const anecdoteToChange = anecdote
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const res = await anecdoteService.updateAnecdote(updatedAnecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: res
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
  }
}

export default reducer