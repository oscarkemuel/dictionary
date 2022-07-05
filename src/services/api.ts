import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

export const apiDictionary = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
  adapter: cache.adapter
})