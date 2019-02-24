import React from 'react'
import login from '../services/login.js'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const LoginForm = ({ setUser, blogService, setMessage }) => {
    const username = useField('text')
    const password = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login.loginService({
                username: username.value,
                password: password.value
            })

            username.reset()
            password.reset()

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            console.log('Käyttäjätunnus tai salasana virheellinen')
            setMessage({ error: true, text: 'Käyttäjätunnus tai salasana virheellinen' })
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                Käyttäjätunnus
                <input  {...username} reset={null} />
            </div>
            <div>
                Salasana
                <input {...password} reset={null} />
            </div>
            <button type="submit">Kirjaudu</button>
        </form>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    blogService: PropTypes.object.isRequired,
    setMessage: PropTypes.func.isRequired
}

export default LoginForm