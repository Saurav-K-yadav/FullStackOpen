const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({}).populate('user',{ username:1 ,name:1 })
    response.json(notes)
})


notesRouter.get('/:id', async(request, response, next) => {
    
    try {
        const resultNote=await Note.findById(request.params.id)
        if (resultNote) {
            response.json(resultNote)
        }
        else {
            response.status(404).end()
        }
    }
    catch (error) {
        next(error)
    }
})


notesRouter.post('/', async (request, response, next) => {
    try { 
    const body = request.body
    const decodedtoken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedtoken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedtoken.id)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user:user._id
    })
 

        const savedNote = await note.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()
        response.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }       
})


notesRouter.delete('/:id', async(request, response, next) => {
    try {
       await Note.findByIdAndDelete(request.params.id)        
        response.status(204).end()
    }
    catch (error) { next(error) }
})


notesRouter.put('/:id', async(request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    try {
        const res= await Note.findByIdAndUpdate(request.params.id, note, { new: true })
        response.status(200).json(res)    
    }
    catch (error) { next(error) }
})

module.exports = notesRouter