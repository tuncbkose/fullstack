import React, {useEffect, useState} from 'react';

import diaryService from './services/diaries'

import {NewDiaryEntry, NonSensitiveDiaryEntry} from "./types";
import Entry from "./components/Entry";
import EntryForm from "./components/EntryForm";


function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  const createEntry = (newEntry: NewDiaryEntry) => {
    console.log(newEntry)
    diaryService.create(newEntry)
      .then(entry => setEntries(entries.concat(entry)))
  }

  useEffect(() => {
    diaryService.getAll()
      .then(entries => setEntries(entries))
  }, [])

  return (
    <div className="App">
      <EntryForm createEntry={createEntry}/>
      <h2>Diary Entries</h2>
      {entries.map(entry => <Entry key={entry.date} {... entry}/>)}
    </div>
  );
}

export default App;
