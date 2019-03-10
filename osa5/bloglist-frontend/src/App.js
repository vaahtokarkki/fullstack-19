import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Notification from './components/Notification'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogsList'

import { initBlogs, addVote, deleteBlog } from './reducers/blogReducer'


const App = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        props.initBlogs()

        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogAppUser')
        blogService.setToken(null)
    }

    const handleVote = blog => {
        props.addVote(blog)
    }

    const handleDelete = blog => {
        props.deleteBlog(blog)
    }


    if (user === null) {
        return (
            <Router>
                <Route exact path="/" render={() => {
                    return (<div>
                        <Notification />
                        <LoginForm
                            setUser={setUser}
                            blogService={blogService} />
                    </div>)
                }} />
            </Router>
        )
    }

    const findBlogById = (id) => {
        const filteredBlog = props.blogs.filter(b => b.id === id)[0]
        if (!filteredBlog) return null
        return <Blog
            blog={filteredBlog} handleVote={() => handleVote(filteredBlog)}
            handleDelete={() => handleDelete(filteredBlog)}
            loggedInUser={user} />
    }


    return (
        <Router>
            <div>
                <Header handleLogout={handleLogout} />
                <Route exact path="/" render={() => <BlogList user={user} />} />
                <Route exact path="/blogs" render={() => <BlogList user={user} />} />
                <Route path="/blogs/:id" render={({ match }) => findBlogById(match.params.id)} />
            </div>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    initBlogs, addVote, deleteBlog
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default ConnectedApp