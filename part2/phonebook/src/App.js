import { useState, useEffect } from 'react'
import Numbers from "./Numbers.js"
import PersonForm from "./PersonForm.js"
import Filter from "./Filter.js"
import phonebookService from "./services"


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")

    useEffect(() => {
        phonebookService
            .getAll()
            .then(persons => {
                setPersons(persons)
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
            }

            phonebookService
                .create(person)
                .then(returnedPerson =>{
                    setPersons(persons.concat(returnedPerson))
                    setNewName("")
                    setNewNumber("")
                })
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

    const deleteEntry = (id) => {
        phonebookService
            .deleteEntry(id)
            .then(() => {
                setPersons(persons.filter(
                    person => person.id !== id
                ))
            })
            .catch(error => {
                alert(`person with id: ${id} was already deleted from server`)
                setPersons(persons.filter(
                    person => person.id !== id
                ))
            })
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
            <Numbers persons={persons} filter={filter} deleteEntry={deleteEntry}/>
        </div>
  )
}

export default App