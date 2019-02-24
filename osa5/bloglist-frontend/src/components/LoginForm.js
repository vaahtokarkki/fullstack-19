import React, { useState } from 'react'
import login from '../services/login.js'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, blogService, setMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await login.loginService({
                username, password,
            })

            setUsername('')
            setPassword('')

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
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Salasana
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
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