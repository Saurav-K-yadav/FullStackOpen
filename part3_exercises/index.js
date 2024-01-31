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

app.get('/info', (request, response) => {
    let count = data.length;
    response.status(200).send(`<div>Phonebook has info for ${String(count)} People <br>${new Date().toString()}<div>`).end()
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
    if (!(name && number)) {
        next(error)
    }
    // if (data.find(person => person.name === name)) {
    //     return response.status(400).send(`error: 'Name already exits' `).end()
    // }
    const entry = new Contact({
        "name": name,
        "number": number,
    })
    entry.save().then(savedNote => {
        response.json(savedNote)
    })
})


app.delete('/api/persons/:id', (request, response,next) => {
    Contact.findByIdAndDelete(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error=>next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number:body.number,
    }

    Contact.findByIdAndUpdate(request.params.id, person, { new: true }).then(updatedContact => {
        response.json(updatedContact)
    }).catch(error=>next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
    
})