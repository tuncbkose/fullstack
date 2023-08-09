import {useParams} from "react-router-dom";
import patientService from "../../services/patients";

import {Diagnosis, Patient} from "../../types";
import {useEffect, useState} from "react";
import PatientEntry from "./PatientEntry";

interface Props {
    diagnoses: Diagnosis[];
}

const PatientPage = ({diagnoses}: Props) => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient|undefined>(undefined);
    useEffect(() => {
        if (!id) return
        patientService.getPatient(id)
            .then(p => setPatient(p))
    }, [id]);
    if (!patient) return null
    return (
        <>
            <h2>{patient.name} {patient.gender}</h2>
            <p>
                ssn: {patient.ssn} <br/>
                occupation: {patient.occupation}
            </p>
            <h3>entries</h3>
            {patient.entries.map((entry, index) =>
                <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses}/>)}
        </>
    )
}

export default PatientPage