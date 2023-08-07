import React, {useEffect, useState} from 'react';
import axios from "axios";

import {NonSensitiveDiaryEntry} from "./types";
import Entry from "./components/Entry";


function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3000/api/diaries')
      .then(response => {
        console.log(response.data);
        setEntries(response.data);
      })
  }, [])

  return (
    <div className="App">
      <h2>Diary Entries</h2>
      {entries.map(entry => <Entry key={entry.date} {... entry}/>)}
    </div>
  );
}

export default App;
