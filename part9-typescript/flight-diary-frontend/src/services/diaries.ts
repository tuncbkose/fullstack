import axios from 'axios'
import {NewDiaryEntry, NonSensitiveDiaryEntry} from "../types";
const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
  return response.data
}

const create = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, newEntry)
  return response.data
}

export default {getAll, create}