import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Notification from './Notification'

const Header = ({ handleLogout }) => {
    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <Togglable buttonLabel='Create new blog'>
                <NewBlog />
            </Togglable>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
        </div>
    )
}

export default Header