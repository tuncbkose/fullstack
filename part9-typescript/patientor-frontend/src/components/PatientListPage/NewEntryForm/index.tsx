import {useState} from "react";
import {HealthCheckEntryForm} from "./HealthCheckEntryForm";
import {Diagnosis, EntryWithoutId} from "../../../types";
import {OccupationalHealthcareEntryForm} from "./OccupationalHealthcareEntryForm";
import {HospitalEntryForm} from "./HospitalEntryForm";

interface Props {
    addNewEntry: (newEntry: EntryWithoutId) => void,
    diagnoses: Diagnosis[]
}

const formStyle = {
    borderStyle: 'dashed',
    padding: 10,
}

export const NewEntryForm = (props: Props) => {
    const [selectedEntryForm, setSelectedEntryForm] = useState('');
    let form;
    switch (selectedEntryForm) {
        case "HealthCheck":
            form = <HealthCheckEntryForm {...props}/>
            break
        case "OccupationalHealthcare":
            form = <OccupationalHealthcareEntryForm {...props}/>
            break
        case "Hospital":
            form = <HospitalEntryForm {...props}/>
            break
        default:
            form = null;
    }
    return (
        <div style={formStyle}>
            <h2>New Entry</h2>
            <button onClick={()=>setSelectedEntryForm('HealthCheck')}>Healthcheck Entry</button>
            <button onClick={()=>setSelectedEntryForm('Hospital')}>Hospital Entry</button>
            <button onClick={()=>setSelectedEntryForm('OccupationalHealthcare')}>Occupational Healthcare Entry</button> <br/>
            {form} <br/>
            <button onClick={()=>setSelectedEntryForm('')}>cancel</button>
        </div>
    )
}