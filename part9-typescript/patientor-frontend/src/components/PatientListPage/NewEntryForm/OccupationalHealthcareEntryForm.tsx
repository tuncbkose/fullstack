import React, {useState} from "react";
import {EntryWithoutId, OccupationalHealthcareEntryT} from "../../../types";

const defaultEntry = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: '',
    employer: '',
    sickLeaveStart: '',
    sickLeaveEnd: '',
}

interface Props {
    addNewEntry: (newEntry: EntryWithoutId) => void
}

export const OccupationalHealthcareEntryForm = ({addNewEntry}: Props) => {
    const [newEntry, setNewEntry] = useState(defaultEntry);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const {sickLeaveStart, sickLeaveEnd, ...rest} = newEntry
        const entryObject: Omit<OccupationalHealthcareEntryT, 'id'> = {
            ...rest,
            type: "OccupationalHealthcare",
            diagnosisCodes: newEntry.diagnosisCodes.split(','),
        }
        if (!(sickLeaveStart === '')){
            entryObject.sickLeave = {
                startDate: sickLeaveStart,
                endDate: sickLeaveEnd
            }
        }
        addNewEntry(entryObject)
        setNewEntry(defaultEntry)
    }

    return (
        <form onSubmit={handleSubmit}>
            Description:
            <input value={newEntry.description}
                   name='description'
                   onChange={handleChange}/> <br/>
            Date:
            <input type="date"
                   value={newEntry.date}
                   name='date'
                   onChange={handleChange}/> <br/>
            Specialist:
            <input value={newEntry.specialist}
                   name='specialist'
                   onChange={handleChange}/> <br/>
            Employer:
            <input value={newEntry.employer}
                   name='employer'
                   onChange={handleChange}/> <br/>
            Diagnosis codes:
            <input value={newEntry.diagnosisCodes}
                   name='diagnosisCodes'
                   onChange={handleChange}/> <br/>
            Sickleave <br/>
            start:
            <input type="date"
                   value={newEntry.sickLeaveStart}
                   name='sickLeaveStart'
                   onChange={handleChange}/> <br/>
            end:
            <input type="date"
                   value={newEntry.sickLeaveEnd}
                   name='sickLeaveEnd'
                   onChange={handleChange}/> <br/>
            <button type='submit'>add</button>
        </form>
    )
}