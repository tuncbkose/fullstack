const express = require("express")
const Person = require('./models/person')
const morgan = require("morgan")
morgan.token("body", (req, res) => {
    if (req.method === "POST"){
        return ( JSON.stringify(req.body) )
    }
    return(" ")
})

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))



app.get("/api/persons", (request, response) => {
    Person.find({})
        .then(
        persons => response.json(persons)
        )
})

app.get("/info", (request, response) => {
    Person.countDocuments({})
        .then(
            result => response.send(
                `Phonebook has info for ${result} people <br>${Date()}`
            )
        )
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(
        person => {
            if (person){
                response.json(person)
            } else {
                response.status(404).end()
            }
        }
    ).catch(error => {
        console.log(error)
        response.status(400).send({error: 'malformatted id'})
    })
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({error: "name missing"})
    } else if (!body.number) {
        return response.status(400).json({error: "number missing"})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})