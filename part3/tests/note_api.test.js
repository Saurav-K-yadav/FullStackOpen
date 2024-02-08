const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note=require('../models/note')
const api = supertest(app)
const helper=require('./test_helper')


beforeEach(async () => {
    await Note.deleteMany({})
    // const noteObj = helper.initialNotes.map(note => new Note(note))
    // const promiseArr = noteObj.map(note => note.save())
    // await Promise.all(promiseArr)

    const noteObj = helper.initialNotes.map(note => new Note(note))
    for (let i of noteObj) {
        await i.save()
    }
})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
        'Browser can execute only JavaScript'
    )
})

test('Adding an valid notes', async () => {
    
    const newNote = {
        content:'Async await function is working',
        important:true 
    }

    await api.post('/api/notes').send(newNote).expect(201).expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)

    expect(contents).toContain('Async await function is working')

})

test('Note without content is not added', async()=> {
    const newNote = {
        content: "",
        important:true
    }

    await api.post('/api/notes').send(newNote).expect(400)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)

}
)

test('A Note can be viewed from its id', async () => { 
    const allNote = await helper.notesInDb()
    const noteViewing = allNote[0]
    const result = await api.get(`/api/notes/${noteViewing.id}`).expect(200).expect('Content-Type', /application\/json/)
    expect(result.body).toEqual(noteViewing)

})

test('Deleting a Note', async()=> {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(
        helper.initialNotes.length - 1
    )
    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
})

afterAll(async () => {
    await mongoose.connection.close()
})