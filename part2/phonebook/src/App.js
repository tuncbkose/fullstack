import { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: "040-1234567" }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")


    const addEntry = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)){
            alert(`${newName} is already added to phonebook`)
        } else {
            const person = {
                name: newName,
                number: newNumber
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

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addEntry}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
  )
}

export default App