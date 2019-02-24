import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ updateBlogs, updateMessage }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (target) => {
        target.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        try {
            const response = await blogService.create(newBlog)
            updateBlogs(response)
            resetForm()
            updateMessage({
                error: false,
                text: 'Blog added succesfully'
            })
        } catch (exception) {
            updateMessage({
                error: true,
                text: 'Missing required fields'
            })
            console.log('err', exception)
        }
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

export default NewBlog