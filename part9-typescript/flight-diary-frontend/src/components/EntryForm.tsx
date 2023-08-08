import {EntryFormProps, NewDiaryEntry, Visibility, Weather} from "../types";
import React, {useState} from "react";


const emptyEntry = {
    date: '',
    visibility: '',
    weather: '',
    comment: ''
}

const EntryForm = (props: EntryFormProps) => {
    const [newEntry, setNewEntry] = useState(emptyEntry);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const entryToAdd: NewDiaryEntry = {
            ...newEntry,
            visibility: Visibility[newEntry.visibility as keyof typeof Visibility],
            weather: Weather[newEntry.weather as keyof typeof Weather],
        }
        props.createEntry(entryToAdd)
        setNewEntry(emptyEntry)
    }

    return (
        <>
            <h2>Add a new entry</h2>
            <form onSubmit={handleSubmit}>
                date <input value={newEntry.date}
                       name='date'
                       onChange={handleChange}/> <br/>
                visibility <input value={newEntry.visibility}
                       name='visibility'
                       onChange={handleChange}/> <br/>
                weather <input value={newEntry.weather}
                       name='weather'
                       onChange={handleChange}/> <br/>
                comment <input value={newEntry.comment}
                       name='comment'
                       onChange={handleChange}/> <br/>
                <button type='submit'>add</button>
            </form>
        </>
    )
}

export default EntryForm