const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('blogs API tests', () => {
    beforeEach(async () => {
        await Blog.remove({})

        const noteObjects = helper.listOfBlogs
            .map(blog => new Blog(blog))
        const promiseArray = noteObjects.map(blog => blog.save())
        await Promise.all(promiseArray)

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('id field is named correctly', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.listOfBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain('Type wars')
    })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'Blog about Jest',
            author: 'Developer of Jest',
            url: 'http://localhost',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd.length).toBe(helper.listOfBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain('Blog about Jest')
    })

    test('correct value of likes if not defined when adding blog', async () => {
        const newBlog = {
            title: 'Value for life',
            author: 'Tieto Oyj',
            url: 'https://www.tieto.com/fi/'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        const filtered = blogsAtEnd.filter(b => b.title.includes('Value for life'))
        expect(filtered[0].likes).toBe(0)
    })

    test('can not add blog without required fields', async () => {
        await api
            .post('/api/blogs')
            .send({})
            .expect(400)
    })

    test('delete single blog', async () => {
        const newBlog = {
            title: 'Delete this',
            author: 'delete',
            url: 'localhost:3001'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)

        await api
            .delete(`/api/blogs/${response.body.id}`)
            .expect(204)

        const allBlogs = await helper.blogsInDB()
        const filtered = allBlogs.filter(b => b.title.includes('Delete this'))
        expect(filtered).toHaveLength(0)
    })
})

describe('user API tests', () => {
    beforeEach(async () => {
        await Blog.remove({})

        const blogObjects = helper.listOfBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)

        await User.remove({})
        const userObjects = helper.listOfUsers
            .map(user => new User(user))
        const userPromiseArray = userObjects.map(u => u.save())
        await Promise.all(userPromiseArray)
    })

    test('registration works with new username', async () => {
        const newUser = {
            name: 'Test',
            username: 'fullstack',
            password: 'fullstack-19'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(helper.listOfUsers.length + 1)
    })

    test('registration does not work with username already in use', async () => {
        const result = await api
            .post('/api/users')
            .send(helper.listOfUsers[0])
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(helper.listOfUsers.length)
    })

    test('registration does not work with too short username or password', async () => {
        const newUser = {
            name: 'short',
            username: 'ye',
            password: '42'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('psasword must be at least')

        const allUsers = await helper.usersInDB()
        expect(allUsers.length).toBe(helper.listOfUsers.length)

    })

})

describe('Delete blog tests with Authorazion', async () => {
    beforeEach(async () => {
        await Blog.remove({})
        await User.remove({})

        for (let user of helper.listOfUsers) {
            await api
                .post('/api/users')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        }

        const res = await api
            .post('/api/login')
            .send({
                username: 'root',
                password: 'toor'
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        await api
            .post('/api/blogs')
            .send(helper.listWithOneBlog[0])
            .set('Authorization', `bearer ${res.body.token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('can not delete without auth header', async () => {
        const blogs = await helper.blogsInDB()
        await api
            .delete(`/api/blogs/${blogs[0].id}`)
            .expect(401)
    })

    test('can not delete other users blog', async () => {
        const res = await api
            .post('/api/login')
            .send({
                username: 'jest',
                password: 'tsej'
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDB()

        const result = await api
            .delete(`/api/blogs/${blogs[0].id}`)
            .set('Authorization', `bearer ${res.body.token}`)
            .expect(400)

        expect(result.body.error).toContain('you can delete only your own blogs')
    })

    test('can delete own blog', async () => {
        const res = await api
            .post('/api/login')
            .send({
                username: 'jest',
                password: 'tsej'
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const newBlogRes = await api
            .post('/api/blogs')
            .send(helper.listOfBlogs[1])
            .set('Authorization', `bearer ${res.body.token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        await api
            .delete(`/api/blogs/${newBlogRes.body.id}`)
            .set('Authorization', `bearer ${res.body.token}`)
            .expect(204)
    })
})

afterAll(() => {
    mongoose.connection.close()
})


