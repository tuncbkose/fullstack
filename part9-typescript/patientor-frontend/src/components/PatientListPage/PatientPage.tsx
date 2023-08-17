import {useParams} from "react-router-dom";
import patientService from "../../services/patients";

import {Diagnosis, Patient, EntryWithoutId} from "../../types";
import {useEffect, useState} from "react";
import PatientEntry from "./PatientEntry";
import {NewEntryForm} from "./NewEntryForm";
import Notification from "./Notification";
import axios from "axios";

interface Props {
    diagnoses: Diagnosis[];
}

const PatientPage = ({diagnoses}: Props) => {
    const id = useParams().id;
    const [notification, setNotification] = useState('');
    const [patient, setPatient] = useState<Patient|undefined>(undefined);
    useEffect(() => {
        if (!id) return
        patientService.getPatient(id)
            .then(p => setPatient(p))
    }, [id]);

    const addNewEntry = (newEntry: EntryWithoutId) => {
        if (!id) return
        patientService.addEntry(id, newEntry)
            .then(p => setPatient(p))
            .catch(error => {
                if (axios.isAxiosError(error) && error.response){
                    setNotification(error.response.data)
                    setTimeout(() => setNotification(''), 5000)
                } else {
                    console.error(error)
                }
            })
    }

    if (!patient) return null
    return (
        <>
            <h2>{patient.name} {patient.gender}</h2>
            <p>
                ssn: {patient.ssn} <br/>
                occupation: {patient.occupation}
            </p>
            <Notification message={notification}/>
            <NewEntryForm addNewEntry={addNewEntry}/>
            <h3>entries</h3>
            {patient.entries.map((entry, index) =>
                <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses}/>)}
        </>
    )
}

export default PatientPage