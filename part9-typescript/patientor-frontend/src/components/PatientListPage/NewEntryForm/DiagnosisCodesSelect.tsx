import {Diagnosis} from "../../../types";
import React from "react";

interface Props {
    diagnoses: Diagnosis[],
    state: any,
    setState: (state: any) => void,
}

export const DiagnosisCodesSelect = ({diagnoses, state, setState}: Props) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            diagnosisCodes: Array.from(event.target.options).filter(opt => opt.selected).map(opt => opt.value)
        })
    }
    return (
        <select multiple
                name="diagnosisCodes"
                onChange={handleChange}
                value={state.diagnosisCodes}>
            {diagnoses.map((d, idx)=>
                <option key={idx}>{d.code}</option>
            )}
        </select>
    )
}