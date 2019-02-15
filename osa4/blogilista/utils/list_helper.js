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

module.exports = {
    dummy, totalLikes, favoriteBlog
}