import {Diagnosis, OccupationalHealthcareEntryT} from "../../../types";
import {entryStyle} from "../../../utils";

interface Props {
    entry: OccupationalHealthcareEntryT;
    diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({entry, diagnoses}: Props) => {
    return (
        <div style={entryStyle} className='OccupationalHealthcareEntry'>
            {entry.date} {entry.employerName} ({entry.type} entry) <br/>
            <i>{entry.description}</i> <br/>
            diagnosis by {entry.specialist}
        </div>
    )
}

export default OccupationalHealthcareEntry