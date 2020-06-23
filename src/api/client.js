import axios from 'axios';

const BASE_URL = `https://api.8base.com/${process.env.REACT_APP_TOKEN_ID ? process.env.REACT_APP_TOKEN_ID: 'ckbq678e0000207kzc4rt1en2'}`; 
const TIMEOUT = 30000;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    Accept: 'application/json',
  },
});

const post = async (...args) => {
  try {
    const response = await axiosClient.post(...args);
    
    return response.data;
  } catch(error) {
    return Promise.reject(error);
  }
};

export default {
  post,
};
