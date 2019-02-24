import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async credentials => {
    console.log('wat',credentials)
    const response = await axios.post(baseUrl, credentials)
    console.log('asdf',response)
    return response.data
};

export default { loginService }