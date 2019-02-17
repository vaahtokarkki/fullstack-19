const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list is empty', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(testHelper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs equals the likes of that', () => {
        const result = listHelper.totalLikes(testHelper.listOfBlogs)
        expect(result).toBe(36)
    })

})

describe('blog with most likes', () => {
    test('when list is empty', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(null)
    })

    test('when list has only one blog', () => {
        const result = listHelper.favoriteBlog(testHelper.listWithOneBlog)
        expect(result).toEqual(testHelper.listWithOneBlog[0])
    })

    test('when list has multiple blogs', () => {
        const result = listHelper.favoriteBlog(testHelper.listOfBlogs)
        expect(result).toEqual(testHelper.listOfBlogs[2])
    })
})

describe('author with most blogs', () => {
    test('when list is empty', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(null)
    })

    test('when list has only one blog', () => {
        const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
        const expedtedResult = {
            author: testHelper.listWithOneBlog[0].author,
            blogs: 1
        }
        expect(result).toEqual(expedtedResult)
    })

    test('when list has multiple blogs', () => {
        const result = listHelper.mostBlogs(testHelper.listOfBlogs)
        const expedtedResult = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expedtedResult)
    })
})