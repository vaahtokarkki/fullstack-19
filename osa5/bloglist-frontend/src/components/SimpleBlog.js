import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div className='container'>
        <div className='blog-title'>
            {blog.title} {blog.author}
        </div>
        <div className='blog-description'>
            blog has {blog.likes} likes
            <button onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog
