const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
    const notes = await Note.find({})
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
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    try { 

        const savedNote=await note.save()
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