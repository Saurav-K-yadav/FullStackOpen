const blogsRouter = require('express').Router()
// const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response,next) => {
    try{const allBlogs = await Blog.find({})
        response.json(allBlogs)    
    
    } catch (error) {
        next(error)
    }
})
 
blogsRouter.get('/:id', async(request, response, next) => {
    try {
        
        const blog=await Blog.findById(request.params.id)
       
        if (blog != null) { 
            response.json(blog)
        
        } 
    } catch (error) {
        response.status(404).end()
        next(error)
    }
})

blogsRouter.post('/', async(request, response,next) => {
    try {
        const blog = new Blog(request.body)
        const savedBlog=await blog.save()
        response.status(201).json(savedBlog)
    }
    catch(error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    catch(error){next(error)}
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    try { 
    let req=await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(req)
    }
    catch (error) { next(error) }
})
module.exports=blogsRouter