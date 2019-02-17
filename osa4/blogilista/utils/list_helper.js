const _ = require('lodash')

const reducer = (accumulator, currentValue) => accumulator + currentValue

const compare = (a, b) => {
    if (a.likes < b.likes) {
        return 1
    } else if (a.likes > b.likes) {
        return -1
    }
    return 0
}

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length < 1) return null

    //Copy array
    const sortedBlogs = blogs.slice()

    return sortedBlogs.sort(compare)[0]
}

const mostBlogs = (blogs) => {
    if (blogs === undefined || blogs.length < 1) return null

    const grouped = _.countBy(blogs, 'author')

    let sorted = []
    for (let author in grouped) {
        sorted.push([author, grouped[author]])
    }
    sorted.sort((a, b) => {
        return b[1] - a[1]
    })

    return {
        author: sorted[0][0],
        blogs: sorted[0][1]
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}