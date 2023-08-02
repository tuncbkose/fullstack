import patientsData from '../../data/patients';

import { Patient, PublicPatient } from '../types';

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

export default {
  getEntries,
  getEntriesPublic
};