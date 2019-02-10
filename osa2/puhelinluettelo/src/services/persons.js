import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res => res.data)
}

const create = newPerson => {
    return axios
        .post(baseUrl, newPerson)
        .then(res => res.data)
}

const updatePerson = (id, newPerson) => {
    return axios
        .put(`${baseUrl}/${id}`, newPerson)
        .then(res => res.data)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
        .then(res => res.data)
}

export default { getAll, create, updatePerson, deletePerson }