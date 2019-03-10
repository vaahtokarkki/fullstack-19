import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleVote, handleDelete, loggedInUser }) => {

    const blogStyle = {
        padding: 5,
        margin: 10,
        width: '70%',
        border: '1px solid lightgrey'
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


    let user //Jostain syystä yhden rivin totetutus ei toimi
    if (!blog.user) {
        user = 'na'
    } else {
        user = blog.user.username
    }

    return (
        <div style={blogStyle} className='blog-container'>
            <div className='blog-title'>
                <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
            </div>
            <div className='blog-description'>
                <a href={`http://${blog.url}`}>{blog.url}</a><br />
                {blog.likes} likes <button onClick={handleVote}>like</button><br />
                added by {user}<br />
                {deleteButton()}
            </div>
        </div>
    )
}

export default Blog