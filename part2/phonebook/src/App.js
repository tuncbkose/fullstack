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
    const [notification, setNotification] = useState({message: "", color: ""})

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
                        setNotification({message:`Updated ${newName}`, color:"green"})
                        setNewName("")
                        setNewNumber("")
                        setTimeout(setNotification, 3000, {message: "", color: ""})
                    })
                    .catch(error => {
                        setNotification({
                            message: `Information of ${newName} has already been removed from server`,
                            color: "red"
                    })
                        setTimeout(setNotification, 3000, {message: "", color: ""})
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
                    setNotification({
                        message:`Added ${newName}`,
                        color: "green"
                })
                    setTimeout(setNotification, 3000, {message: "", color: ""})
                    setNewName("")
                    setNewNumber("")
                })
                .catch(error => {
                    setNotification({
                        message: error.response.data.error,
                        color: "red"
                })
                    setTimeout(setNotification, 3000, {message: "", color: ""})
                    console.log(error.response.data.error)
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
            <Notification settings={notification}/>
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