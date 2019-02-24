const blogs = [
    {
        title: 'Mock',
        author: 'Jest',
        url: 'localhost',
        likes: 0,
        user: {
            username: 'Erkki',
            id: '5c68544e6d94404aaf2a60f0'
        },
        id: '5c6c3621c4043c6d4f630929'
    },
    {
        title: 'Mock is nice',
        author: 'Jest',
        url: 'localhost',
        likes: 0,
        user: {
            username: 'Erkki',
            id: '5c68544e6d94404aaf2a60f0'
        },
        id: '5c6c3621c4043c6d4f630929'
    },
    {
        title: 'Pls pass tests',
        author: 'Jest',
        url: 'localhost',
        likes: 0,
        user: {
            username: 'Erkki',
            id: '5c68544e6d94404aaf2a60f0'
        },
        id: '5c6c3621c4043c6d4f630929'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }
