const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

// expecting 3 or 5 args
if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('Unexpected number of args.')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://phonebook_user:${password}@cluster0.rovfc9i.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5) {
    const entry_name = process.argv[3]
    const entry_number = process.argv[4]

    mongoose
        .connect(url)
        .then((result) => {

            const person = new Person({
                name: entry_name,
                number: entry_number,
            })
            return person.save()
        })
        .then(() => {
            console.log(`added ${entry_name} number ${entry_number} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))

} else { // at this point must be the case to query all entries
    mongoose
        .connect(url)
        .then((result) => {
            Person.find({})
                .then(persons => {
                    console.log("phonebook:")
                    persons.forEach(
                        person => console.log(`${person.name} ${person.number}`)
                    )
                    return mongoose.connection.close()
                })
        })
        .catch((err) => console.log(err))
}
