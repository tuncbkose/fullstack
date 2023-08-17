import {useState} from "react";
import {HealthCheckEntryForm} from "./HealthCheckEntryForm";
import {EntryWithoutId} from "../../../types";

interface Props {
    addNewEntry: (newEntry: EntryWithoutId) => void
}

const formStyle = {
    borderStyle: 'dashed',
    padding: 10,
}

export const NewEntryForm = ({addNewEntry}: Props) => {
    const [selectedEntryForm, setSelectedEntryForm] = useState('');
    let form;
    switch (selectedEntryForm) {
        case "HealthCheck":
            form = <HealthCheckEntryForm addNewEntry={addNewEntry}/>
            break
        default:
            form = null;
    }
    return (
        <div style={formStyle}>
            <h2>New Entry</h2>
            <button onClick={()=>setSelectedEntryForm('HealthCheck')}>Healthcheck Entry</button>
            <button>Hospital Entry</button>
            <button>Occupational Healthcare Entry</button> <br/>
            {form} <br/>
            <button onClick={()=>setSelectedEntryForm('')}>cancel</button>
        </div>
    )
}