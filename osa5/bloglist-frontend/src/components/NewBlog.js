import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const NewBlog = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (target) => {
        target.preventDefault()
        target.persist()

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        if (!newBlog.author || !newBlog.title || !newBlog.url) {
            props.setNotification({
                error: true,
                message: 'Missing required fields'
            })
            return
        }

        props.createBlog(newBlog)
        resetForm()
        props.setNotification({
            error: false,
            message: 'Blog added succesfully'
        })

    }

    const resetForm = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const form = () => (
        <form onSubmit={handleSubmit}>
            <h2>Create new blog</h2>
            <div>
                Title:
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                Author:
                <input
                    type='text'
                    name='author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                Url:
                <input
                    type='text'
                    name='url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type='submit'>Add blog</button>
        </form>
    )

    return form()
}

const mapDispatchToProps = {
    setNotification, createBlog
}

const ConnectedNewBlog = connect(
    null,
    mapDispatchToProps
)(NewBlog)

export default ConnectedNewBlog