import {Diagnosis, HealthCheckEntryT} from "../../../types";
import {entryStyle} from "../../../utils";

interface Props {
    entry: HealthCheckEntryT;
    diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({entry, diagnoses}: Props) => {
    return (
        <div style={entryStyle} className='HealthCheckEntry'>
            {entry.date} ({entry.type} entry) <br/>
            <i>{entry.description}</i> <br/>
            Rating: {entry.healthCheckRating} <br/>
            diagnosis by {entry.specialist}
        </div>
    )
}

export default HealthCheckEntry