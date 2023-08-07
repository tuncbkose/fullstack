import {NonSensitiveDiaryEntry} from "../types";

const Entry = (props: NonSensitiveDiaryEntry) => {
    return (
        <p>
            <b>{props.date}</b> <br/>
            visibility: {props.visibility} <br/>
            weather: {props.weather} <br/>
        </p>
    )
}

export default Entry