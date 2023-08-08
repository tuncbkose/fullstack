import {EntryFormProps, NewDiaryEntry, Visibility, Weather} from "../types";
import React, {useState} from "react";


const defaultEntry = {
    date: '',
    visibility: '',
    weather: '',
    comment: ''
}

const EntryForm = (props: EntryFormProps) => {
    const [newEntry, setNewEntry] = useState(defaultEntry);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const entryToAdd = newEntry as NewDiaryEntry
        props.createEntry(entryToAdd)
        setNewEntry(defaultEntry)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                date <input type="date"
                       value={newEntry.date}
                       name='date'
                       onChange={handleChange}/> <br/>

                visibility
                <input type='radio'
                       name='visibility'
                       onChange={() => setNewEntry({...newEntry, visibility: Visibility.Great})}
                       required/> Great
                <input type='radio'
                       onChange={() => setNewEntry({...newEntry, visibility: Visibility.Good})}
                       name='visibility'/> Good
                <input type='radio'
                       onChange={() => setNewEntry({...newEntry, visibility: Visibility.Ok})}
                       name='visibility'/> Ok
                <input type='radio'
                       onChange={() => setNewEntry({...newEntry, visibility: Visibility.Poor})}
                       name='visibility'/> Poor
                <br/>

                weather
                <input type='radio'
                       name='weather'
                       onChange={() => setNewEntry({...newEntry, weather: Weather.Sunny})}
                       required/> Sunny
                <input type='radio'
                       name='weather'
                       onChange={() => setNewEntry({...newEntry, weather: Weather.Rainy})}
                       /> Rainy
                <input type='radio'
                       name='weather'
                       onChange={() => setNewEntry({...newEntry, weather: Weather.Cloudy})}
                       /> Cloudy
                <input type='radio'
                       name='weather'
                       onChange={() => setNewEntry({...newEntry, weather: Weather.Stormy})}
                       /> Stormy
                <input type='radio'
                       name='weather'
                       onChange={() => setNewEntry({...newEntry, weather: Weather.Windy})}
                       /> Windy
                <br/>

                comment <input value={newEntry.comment}
                       name='comment'
                       onChange={handleChange}/> <br/>
                <button type='submit'>add</button>
            </form>
        </>
    )
}

export default EntryForm