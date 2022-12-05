import axios from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getSSOData = async (SSOType: string) => {
  const { data } = await axios.get(`${SERVER_URL}/auth/${SSOType}`).catch((err) => {
    throw err.response.data.message;
  });
  return data;
};

export const getLocalLoginData = async ([email, password]: [string, string]) => {
  const { data } = await axios.post(`${SERVER_URL}/auth/signin`, { email, password }).catch((err) => {
    throw err.response.data.message;
  });
  return data;
};
