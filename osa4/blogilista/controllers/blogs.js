const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, id: 1 })

    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = request.token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author === undefined ? 'none' : body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

        response.json(savedBlog.toJSON())
    } catch (expection) {
        next(expection)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    if (body.likes === undefined) {
        return response.status(400).json({ error: 'likes field must be defined' })
    }

    const updatedBlog = {
        likes: body.likes
    }

    try {
        const res = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        response.json(res.toJSON())
    } catch (expection) {
        next(expection)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)


    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
            return
        }

        return response.status(400).json({ error: 'you can delete only your own blogs' })
    } catch (expection) {
        next(expection)
    }
})

module.exports = blogsRouter