const express = require('express')
const app = express()
var morgan = require('morgan')
// app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

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

app.use(express.json())
app.use(requestLogger)

app.use(morgan((tokens, req, res) => {
        return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    let count = data.length;
    response.status(200).send(`<div>Phonebook has info for ${String(count)} People <br>${new Date().toString()}<div>`).end()
})

app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    let person = data.find(person => person.id === id)
    if (!person) {
        let msg="No such Entry exist"
        return response.status(404).send(msg).end()
        
    }
    response.json(person).status(200)
})

app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    data=data.filter(person => person.id !== id)
    response.status(204).end()
})

const getId = () => {
    let maxId =1
    while (data.find(person => person.id === maxId))
    {console.log(maxId);
    
        maxId = Math.floor(Math.random() * 10000)
    }
    return maxId 
}

app.post('/api/persons', (request, response) => {
    let {name,number} = request.body
    if (!(name && number)) {
        return response.status(400).send(`No data`).end()
    }
    if (data.find(person => person.name === name)) {
        return response.status(400).send(`error: 'Name already exits' `).end()
    }
    const entry = {
        "id":getId(),
        "name":name,
        "number": number,
    }
    
    data = data.concat(entry)
    response.json(data)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT||3001
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
    
})