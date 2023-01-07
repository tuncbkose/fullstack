const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

function numberValidator(num) {
    if (num.includes("-")) {
        return /^\d{2,3}-\d+$/.test(num)
    } else { return /^\d+$/.test(num) }
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: numberValidator,
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)