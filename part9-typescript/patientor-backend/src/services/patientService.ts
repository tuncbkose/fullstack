import { v1 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import {
    Patient,
    PublicPatient,
    NewPatient, EntryWithoutId, Entry
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

const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: EntryWithoutId, patient_id: string): Patient => {
    const patient = patients.find(patient => patient.id === patient_id);
    if (!patient) throw new Error("Can't find requested patient");
    const newEntry: Entry = {
        id: uuid(),
        ...entry
    };
    patient.entries.push(newEntry);
    return patient;
};

export default {
  getEntries,
  getEntriesPublic,
  addPatient,
  getPatient,
  addEntry
};