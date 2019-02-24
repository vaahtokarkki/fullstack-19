import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const updateMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const updateBlogs = (blog) => {
        const updated = blogs.concat(blog)
        setBlogs(updated)
    }

    const updateModifiedBlog = (blog) => {
        const filtered = blogs.filter(b => b.id !== blog.id)
        setBlogs(filtered.concat(blog))
    }

    const delteBlog = (id) => {
        setBlogs(blogs.filter(b => b.id !== id))
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedNoteappUser')
        blogService.setToken(null)
    }

    const listOfBlogs = () => {
        const sorted = blogs.sort((a, b) => {
            return b.likes - a.likes
        })

        return (sorted.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
                updateBlogs={updateModifiedBlog}
                deleteBlog={delteBlog}
                loggedInUser={user}/>
        ))
    }

    if (user === null) {
        return (
            <div>
                <Notification message={message} />
                <LoginForm
                    setUser={setUser}
                    blogService={blogService}
                    setMessage={setMessage} />
            </div>
        )
    }

    return (
        <div className='app-container'>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <Notification message={message} />
            {listOfBlogs()}
            <Togglable buttonLabel='Create new blog'>
                <NewBlog updateBlogs={updateBlogs} updateMessage={updateMessage} />
            </Togglable>
            <p>
                <button onClick={handleLogout}>Logout</button>
            </p>
        </div>
    )
}

export default App