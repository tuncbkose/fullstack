import React, {useState} from "react";
import {Diagnosis, EntryWithoutId, HospitalEntryT} from "../../../types";
import {DiagnosisCodesSelect} from "./DiagnosisCodesSelect";

const defaultEntry = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    dischargeDate: '',
    dischargeCriteria: '',
}

interface Props {
    addNewEntry: (newEntry: EntryWithoutId) => void,
    diagnoses: Diagnosis[]
}

export const HospitalEntryForm = ({addNewEntry, diagnoses}: Props) => {
    const [newEntry, setNewEntry] = useState(defaultEntry);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const { dischargeDate, dischargeCriteria, ...rest } = newEntry
        const entryObject: Omit<HospitalEntryT, 'id'> = {
            ...rest,
            type: "Hospital",
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
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

            Diagnosis codes:
            <DiagnosisCodesSelect diagnoses={diagnoses} state={newEntry} setState={setNewEntry}/> <br/>

            Discharge <br/>
            date:
            <input type="date"
                   value={newEntry.dischargeDate}
                   name='dischargeDate'
                   onChange={handleChange}/> <br/>
            criteria:
            <input value={newEntry.dischargeCriteria}
                   name='dischargeCriteria'
                   onChange={handleChange}/> <br/>
            <button type='submit'>add</button>
        </form>
    )
}