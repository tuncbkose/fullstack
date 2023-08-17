import {Diagnosis, EntryWithoutId, Gender, HealthCheckRating, NewPatient} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseString = (str: unknown): string => {
    if (!isString(str)) {
        throw new Error('Incorrect or missing string ' + str);
    }
    return str;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object
        && 'dateOfBirth' in object
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object) {
        return {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
            entries: []
        };
    }
    throw new Error('Incorrect data: some fields are missing');
};

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

interface EntryBase {
    description: string;
    date: string;
    specialist: string;
    type: EntryType
    diagnosisCodes?: Array<Diagnosis['code']>
}

const isEntryType = (type: string): type is EntryType => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type);
};

const parseEntryType = (type: unknown): EntryType => {
    if (!isString(type) || !isEntryType(type)) {
        throw new Error('Incorrect or missing entry type: ' + type);
    }
    return type;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

interface Discharge {
    date: string;
    criteria: string;
}

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge ||
        typeof discharge !== 'object'
        ||!('date' in discharge)
        || !('criteria' in discharge)
        || !isString(discharge.date)
        || !isDate(discharge.date)
        || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return {
        date: parseDate(discharge.date),
        criteria: parseString(discharge.criteria)
    };
};

interface SickLeave {
    startDate: string;
    endDate: string;
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave
        || typeof sickLeave !== 'object'
        || !('startDate' in sickLeave)
        || !('endDate' in sickLeave)
        || !isString(sickLeave.startDate)
        || !isDate(sickLeave.startDate)
        || !isString(sickLeave.endDate)
        || !isDate(sickLeave.endDate)){
        throw new Error('Incorrect or missing sick leave ' + sickLeave);
    }
    // I'll just trust one is later than the other
    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate)
    };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if ( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('description' in object
        && 'date' in object
        && 'specialist' in object
        && 'type' in object){
        const base: EntryBase = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            type: parseEntryType(object.type),
        };
        if ('diagnosisCodes' in object){
            base.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        switch (base.type){
            case "HealthCheck": {
                if (!('healthCheckRating' in object)) throw new Error('Incorrect data: some fields are missing');
                return {
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                    ...base,
                    type: "HealthCheck", // this makes type checking happier
                };
            }
            case "Hospital": {
                if (!('discharge' in object)) throw new Error('Incorrect data: some fields are missing');
                return {
                    discharge: parseDischarge(object.discharge),
                    ...base,
                    type: "Hospital"
                };
            }
            case "OccupationalHealthcare":
                if (!('employer' in object)) throw new Error('Incorrect data: some fields are missing');
                return {
                    employerName: parseString(object.employer),
                    ...base,
                    type: "OccupationalHealthcare",
                    sickLeave: 'sickLeave' in object ? parseSickLeave(object.sickLeave) : undefined
                };
            default:
                assertNever(base.type);
        }
    }
    throw new Error('Incorrect data: some fields are missing');
};
