import React from 'react'
import { addVote, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import Blog from '../components/Blog'

const BlogList = (props) => {
    const handleVote = blog => {
        props.addVote(blog)
    }
    
    const handleDelete = blog => {
        props.deleteBlog(blog)
    }

    return (
        <div className='app-container'>
            {props.blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleVote={() => handleVote(blog)}
                    handleDelete={() => handleDelete(blog)}
                    loggedInUser={props.user} />
            )}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    addVote, deleteBlog
}

const ConnectedBlogList = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)

export default ConnectedBlogList