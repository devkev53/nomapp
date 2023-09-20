import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/'

export const axiosPrivateInstance = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

export const axiosPublicInstance = axios.create({
  baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

export const updateHeader = (request) => {
}