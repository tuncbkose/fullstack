import express from 'express';
import patientService from "../services/patientService";
import {toNewPatient, toNewEntry} from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntriesPublic());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (!patient){
    res.sendStatus(404);
  }
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(newEntry, req.params.id);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

export default router;