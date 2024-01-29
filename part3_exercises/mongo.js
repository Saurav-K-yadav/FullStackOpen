
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://sauravkumaryadav100:${password}@phonebook.8gav06a.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    // id: Number,
    name: String,
    number:Number,
})

const Contact = mongoose.model('Phonebook', contactSchema)

if(process.argv.length===5)
{const contact = new Contact({
    // id: '1',
    name: process.argv[3],
    number:process.argv[4]
})

contact.save().then(result => {
    console.log('contact saved!')
    mongoose.connection.close()
})
}
if(process.argv.length === 3){
Contact.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
}