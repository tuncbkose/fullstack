import {entryStyle} from "../../../utils"
import {Diagnosis, HospitalEntryT} from "../../../types";

interface Props {
    entry: HospitalEntryT;
    diagnoses: Diagnosis[];
}

const HospitalEntry = ({entry, diagnoses}: Props) => {
    return (
        <div style={entryStyle} className='HospitalEntry'>
            {entry.date} ({entry.type} entry) <br/>
            <i>{entry.description}</i> <br/>
            diagnosis by {entry.specialist}
        </div>
    )
}

export default HospitalEntry