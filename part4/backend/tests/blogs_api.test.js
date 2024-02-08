const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObject = new Blog(helper.initialBlog[0])
    await BlogObject.save()
    BlogObject = new Blog(helper.initialBlog[1])
    await BlogObject.save()
})

test('All blogs are returned', async () => {
    const response=await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlog.length)
})

test('A specific Blog is returned', async () => {
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(res => res.title)
    expect(titles).toContain(' The prince')
})

test('A specific Blog is returned', async () => {
    const allNotes = (await helper.blogsInDb()).map(blog => blog.id)
    const response = await api.get(`/api/blogs/${allNotes[0]}`)
    const titles = response.body.title
    const pattern=helper.initialBlog[0].title
    expect(titles).toContain(pattern)
})

test('Unknown ids are rejected', async () => {
    const response = await api.get(`/api/blogs/0007`)
    expect(response.status).toBe(404)
})

test('Id is defined', async () => {
    let allblogs = await api.get('/api/blogs')
    allblogs = allblogs.body.map(blog => blog)
    
    allblogs.forEach(blog => {
        expect(blog.id).toBeDefined
        expect(blog).not.toHaveProperty('_id')
    })
   },100000)


describe('post', () => {
    test('A valid blog can be added', async () => {
        const newBlog = {
            title: ' Temporary addition',
            author: 'Saurav',
            url: 'localhost',
            likes: 400000000,
        }

        await api.post('/api/blogs').send(newBlog).expect(201).
        expect('Content-Type', /application\/json/)
        const finalBlogs = await helper.blogsInDb()
        expect(finalBlogs).toHaveLength(helper.initialBlog.length + 1)
        const titles = finalBlogs.map(blog => blog.title)
        expect(titles).toContain(' Temporary addition')
    })

    test('If likes is missing it default to 0', async () => {
        const newBlog = {
            title: ' Temporary addition',
            author: 'Saurav',
            url: 'localhost',
        }
        await api.post('/api/blogs').send(newBlog).expect(201).
            expect('Content-Type', /application\/json/)
        const finalBlogs = await helper.blogsInDb()
        expect(finalBlogs).toHaveLength(helper.initialBlog.length + 1)
        const likes = finalBlogs.map(blog => blog.likes)
        expect(likes).toContain(0)
    
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})
