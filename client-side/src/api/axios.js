import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + '/api', 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosClient;


