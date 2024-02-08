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
    // const blogs = await helper.blogsInDb()
    let allblogs = await api.get('/api/blogs')
    allblogs = allblogs.body.map(blog => blog)
    
    allblogs.forEach(blog => {
        expect(blog.id).toBeDefined
        expect(blog).not.toHaveProperty('_id')
    })
   },100000)

afterAll(async () => {
    await mongoose.connection.close()
})
