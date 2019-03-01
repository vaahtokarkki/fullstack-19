import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(url)
    return res.data
}

const createNew = async content => {
    const res = await axios.post(
        url,
        content
    )
    return res.data
}

const updateAnecdote = async anecdote => {
    const res = await axios.put(
        `${url}/${anecdote.id}`,
        anecdote
    )
    return res.data
}

export default { getAll, createNew, updateAnecdote }