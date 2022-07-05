import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const apiDictionary = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
})