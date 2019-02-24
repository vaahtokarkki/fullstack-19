import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs, deleteBlog, loggedInUser }) => {
    const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        padding: 5,
        margin: 10,
        width: '70%',
        border: '1px solid lightgrey'
    }

    // Handlereissa userId chekkaukset koska
    // kannassa blogeja ilman usereita..
    const handleUpdate = async () => {
        let userId
        if (!blog.user) {
            userId = null
        } else {
            userId = blog.user.id
        }

        const updated = { ...blog }
        updated.likes = updated.likes + 1
        updated.user = userId
        const response = await blogService.update(blog.id, updated)
        updateBlogs(response)
    }

    const handleDelete = async () => {
        await blogService.remove(blog.id)
        deleteBlog(blog.id)
    }

    const deleteButton = () => {
        let userId
        if (!blog.user || !loggedInUser) {
            return null
        } else {
            userId = blog.user.id
        }

        return userId === loggedInUser.id ? <button onClick={handleDelete}>delete</button> : null
    }

    const showDetails = () => {
        if (!expanded) return null

        let user //Jostain syystä yhden rivin totetutus ei toimi
        if (!blog.user) {
            user = 'na'
        } else {
            user = blog.user.username
        }

        return (
            <div className='blog-description'>
                <a href={`http://${blog.url}`}>{blog.url}</a><br />
                {blog.likes} likes <button onClick={handleUpdate}>like</button><br />
                added by {user}<br />
                {deleteButton()}
            </div>
        )
    }

    return (
        <div style={blogStyle} className='blog-container'>
            <div onClick={() => setExpanded(!expanded)} className='blog-title'>
                {blog.title} {blog.author}
            </div>
            {showDetails()}
        </div>
    )
}

export default Blog