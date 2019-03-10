import React from 'react'
import login from '../services/login.js'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
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
                'loggedBlogAppUser', JSON.stringify(user)
            )
            props.blogService.setToken(user.token)
            props.setUser(user)
        } catch (exception) {
            console.log('Käyttäjätunnus tai salasana virheellinen')
            props.setNotification({ error: true, message: 'Käyttäjätunnus tai salasana virheellinen' })
        }
    }

    return (
        <form onSubmit={handleLogin} className='login-form'>
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
}

const mapDispatchToProps = {
    setNotification
}


const ConnectedLoginForm = connect(
    null,
    mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm