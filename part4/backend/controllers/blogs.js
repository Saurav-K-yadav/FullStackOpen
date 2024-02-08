const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response,next) => {
    try{const allBlogs = await Blog.find({})
    response.json(allBlogs)    
    } catch(error) {
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

blogsRouter.post('/', (request, response,next) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => {
            next(error)
        })
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})
module.exports=blogsRouter