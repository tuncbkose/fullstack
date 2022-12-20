import { useState, useEffect } from 'react'
import Numbers from "./Numbers.js"
import PersonForm from "./PersonForm.js"
import Filter from "./Filter.js"
import Notification from "./Notification.js"
import phonebookService from "./services"


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [message, setMessage] = useState("")

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
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
                const oldEntry = persons.find(person => person.name === newName)
                const newEntry = {...oldEntry, number: newNumber}
                phonebookService
                    .update(newEntry)
                    .then(returnedEntry => {
                        setPersons(persons.map(person => person.name !== newName ? person : returnedEntry))
                        setMessage(`Updated ${newName}`)
                        setNewName("")
                        setNewNumber("")
                        setTimeout(setMessage, 3000, "")
                    })
            }
        } else {
            const person = {
                name: newName,
                number: newNumber,
            }

            phonebookService
                .create(person)
                .then(returnedPerson =>{
                    setPersons(persons.concat(returnedPerson))
                    setMessage(`Added ${newName}`)
                    setTimeout(setMessage, 3000, "")
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
            <Notification message={message}/>
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