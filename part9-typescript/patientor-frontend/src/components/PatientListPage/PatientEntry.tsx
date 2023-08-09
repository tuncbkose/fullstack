import {Diagnosis, Entry} from "../../types";

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const PatientEntry = ({entry, diagnoses}: Props) => {
    const getName = (code: string) => {
        const diagnosis = diagnoses.find(d => d.code === code);
        if (!diagnosis) return '';
        return diagnosis.name;
    }

    const codeList = entry.diagnosisCodes ?
        <ul>{entry.diagnosisCodes.map((code,index) =>
            <li key={index}>{code} {getName(code)}</li>)}
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