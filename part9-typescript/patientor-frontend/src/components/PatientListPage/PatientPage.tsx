import {useParams} from "react-router-dom";
import patientService from "../../services/patients";

import {Patient} from "../../types";
import {useEffect, useState} from "react";

const PatientPage = () => {
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
        </>
    )
}

export default PatientPage