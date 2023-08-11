import {Diagnosis, Entry, HealthCheckEntryT, HospitalEntryT, OccupationalHealthcareEntryT} from "../../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import {assertNever} from  '../../../utils'

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const PatientEntry = (props: Props) => {
    // this is maybe a bit ugly but it should be safe typing-wise
    switch (props.entry.type){
        case "Hospital":
            return <HospitalEntry {...props} entry={props.entry as HospitalEntryT}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry {...props} entry={props.entry as OccupationalHealthcareEntryT}/>
        case "HealthCheck":
            return <HealthCheckEntry {...props} entry={props.entry as HealthCheckEntryT}/>
        default:
            return assertNever(props.entry)
    }
}

export default PatientEntry