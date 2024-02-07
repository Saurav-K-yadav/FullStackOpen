const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlog = [
    {
        title: ' Art of War',
        author: 'Sun Tzu',
        url: 'wikipedia',
        likes: 5000,
    },
    {
        title: ' The prince',
        author: 'Niccolo Machiavelli',
        url: 'wikipedia',
        likes: 4000,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObject = new Blog(initialBlog[0])
    await BlogObject.save()
    BlogObject = new Blog(initialBlog[1])
    await BlogObject.save()
})

test('All blogs are returned', async () => {
    const response=await api.get('/api/blogs')
        
    expect(response.body).toHaveLength(initialBlog.length)
})

test('A specific Blog is returned', async () => {
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(res => res.title)
    expect(titles).toContain(' The prince')
})

afterAll(async () => {
    await mongoose.connection.close()
})
