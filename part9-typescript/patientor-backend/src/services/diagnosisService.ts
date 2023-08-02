import diagnosesData from '../../data/diagnoses';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

export default {
  getEntries
};