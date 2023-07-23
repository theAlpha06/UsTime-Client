import axios from 'axios';
// export const baseUrl = 'http://localhost:4000';
export const baseUrl = 'https://ustime.onrender.com';

export const localUrlIns = axios.create({
  baseURL: baseUrl,
  'withCredentials':true,
  'mode':'cors',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept':'application/json',
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
});
