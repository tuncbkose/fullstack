import React, {useEffect, useState} from 'react';

import diaryService from './services/diaries'

import {NewDiaryEntry, NonSensitiveDiaryEntry} from "./types";
import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";
import Notification from "./components/Notification";
import axios from "axios";


function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

  const createEntry = (newEntry: NewDiaryEntry) => {
    console.log(newEntry)
    diaryService.create(newEntry)
      .then(entry => setEntries(entries.concat(entry)))
      .catch(error => {
        if (axios.isAxiosError(error) && error.response){
            setNotification(error.response.data)
            setTimeout(() => setNotification(''), 5000)
        } else {
         console.error(error)
        }
      })
  }

  useEffect(() => {
    diaryService.getAll()
      .then(entries => setEntries(entries))
  }, [])

  return (
    <div className="App">
      <h2>Add a new entry</h2>
      <Notification message={notification}/>
      <EntryForm createEntry={createEntry}/>
      <h2>Diary Entries</h2>
      {entries.map(entry => <Entry key={entry.date} {... entry}/>)}
    </div>
  );
}

export default App;
