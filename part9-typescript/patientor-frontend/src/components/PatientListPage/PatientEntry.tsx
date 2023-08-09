import {Entry} from "../../types";

interface Props {
    entry: Entry;
}

const PatientEntry = ({entry}: Props) => {
    const codeList = entry.diagnosisCodes ?
        <ul>{entry.diagnosisCodes.map((code,index) =>
            <li key={index}>{code}</li>)}
        </ul>
        : null;

    return (
        <>
            {entry.date} {entry.description}
            {codeList}
        </>
    )
}

export default PatientEntry