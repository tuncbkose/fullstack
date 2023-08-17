import React, {useState} from "react";
import {Diagnosis, EntryWithoutId, HealthCheckEntryT, HealthCheckRating} from "../../../types";
import {DiagnosisCodesSelect} from "./DiagnosisCodesSelect";

const defaultEntry = {
    description: '',
    date: '',
    specialist: '',
    healthCheckRating: HealthCheckRating.Healthy,
    diagnosisCodes: [],
}

interface Props {
    addNewEntry: (newEntry: EntryWithoutId) => void,
    diagnoses: Diagnosis[]
}

export const HealthCheckEntryForm = ({addNewEntry, diagnoses}: Props) => {
    const [newEntry, setNewEntry] = useState(defaultEntry);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const entryObject: Omit<HealthCheckEntryT, 'id'> = {
            ...newEntry,
            type: "HealthCheck",
            healthCheckRating: Number(newEntry.healthCheckRating)
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
            Healthcheck rating:
            <select value={newEntry.healthCheckRating}
                name='healthCheckRating'
                onChange={handleChange}>
                <option value={HealthCheckRating.Healthy}>Healthy</option>
                <option value={HealthCheckRating.LowRisk}>Low Risk</option>
                <option value={HealthCheckRating.HighRisk}>High Risk</option>
                <option value={HealthCheckRating.CriticalRisk}>Critical Risk</option>
            </select> <br/>
            Diagnosis codes:
            <DiagnosisCodesSelect diagnoses={diagnoses} state={newEntry} setState={setNewEntry}/> <br/>
            <button type='submit'>add</button>
        </form>
    )
}