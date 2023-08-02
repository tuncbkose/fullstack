import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import {
    Patient,
    PublicPatient,
    NewPatient
} from '../types';

const patients: Patient[] = patientsData;

const getEntries = () => {
  return patients;
};

const getEntriesPublic = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
  getEntries,
  getEntriesPublic,
  addPatient
};