import { useState, useEffect } from 'react'
import axios from "axios"
import Numbers from "./Numbers.js"
import PersonForm from "./PersonForm.js"
import Filter from "./Filter.js"


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data)
            })
    }, [])


    const addEntry = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)){
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                name: newName,
                number: newNumber,
                id: persons.length + 1
            }
            setPersons(persons.concat(person))
            setNewName("")
            setNewNumber("")
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const updateFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter updateFilter={updateFilter}/>

            <h3>add a new</h3>
            <PersonForm newName={newName}
                        handleName={handleNameChange}
                        newNumber={newNumber}
                        handleNumber={handleNumberChange}
                        handleAdd={addEntry}/>

            <h3>Numbers</h3>
            <Numbers persons={persons} filter={filter}/>
        </div>
  )
}

export default App