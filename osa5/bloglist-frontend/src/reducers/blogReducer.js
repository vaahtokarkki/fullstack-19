import blogService from '../services/blogs'

const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => {
        return b.likes - a.likes
    })
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VOTE':
            const updatedBlog = action.data
            const updatedState = state.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
            return sortBlogs(updatedState)
        case 'DELETE_BLOG':
            const blogToDelete = action.data
            const stateToUpdate = state.filter(b => b.id !== blogToDelete.id)
            return sortBlogs(stateToUpdate)
        case 'NEW_BLOG':
            return sortBlogs(state.concat(action.data))
        case 'INIT_BLOGS':
            return sortBlogs(action.data)
        default:
            return state
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "INIT_BLOGS",
            data: blogs
        })
    }
}

export const createBlog = blog => {
    return async dispatch => {
        const res = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: res
        })
    }
}

export const addVote = blog => {
    return async dispatch => {
        const blogToUpdate = blog
        const updatedBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }
        const res = await blogService.update(updatedBlog.id, updatedBlog)
        dispatch({
            type: 'ADD_VOTE',
            data: res
        })
    }

}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch({
            type: 'DELETE_BLOG',
            data: blog
        })
    }
}

export default blogReducer
