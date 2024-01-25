const express = require('express')
const app = express()
app.use(express.json())

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

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server Running on PORT 3001');
    
})