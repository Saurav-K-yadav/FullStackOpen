require('dotenv').config()
const express = require('express')
const app = express()
const Contact=require('./models/contact')
// var morgan = require('morgan')
const cors = require('cors')


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'Validation Error'){
        return response.status(400).json({error:error.message})
    }
    next(error)
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

// app.use(morgan((tokens, req, res) => {
//         return [
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'),
//         '-',
//         tokens['response-time'](req, res), 'ms',
//         JSON.stringify(req.body)
//     ].join(' ')
// }))


app.get('/api/persons', (request, response) => {
    Contact.find({}).then(result => {
        response.json(result)
    })
})

app.get('/info', (request, response, next) => {
    Contact.find({}).then(result => {
    response.status(200).send(`<div>Phonebook has info for ${String(result.length)} People <br>${new Date().toString()}<div>`).end()
 }).catch(error=>next(error))
})

app.get('/api/persons/:id', (request, response,next) => {
    Contact.findById(request.params.id).then(note => {
        response.json(note)
    }).catch(error => {
        next(error)
    })
})

app.post('/api/persons', (request, response,next) => {
    let { name, number } = request.body
    const entry = new Contact({
        "name": name,
        "number": number,
    })
    entry.save().then(savedNote => {
        response.json(savedNote)
    }).catch(error=>next(error))
})


app.delete('/api/persons/:id', (request, response,next) => {
    Contact.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error=>next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const { name,number}=request.body
    Contact.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedContact => {
        response.json(updatedContact)
    }).catch(error=>next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
    
})