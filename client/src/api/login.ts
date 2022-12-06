import axios from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getSSOData = async (SSOType: string) => {
  const { data } = await axios.get(`${SERVER_URL}/auth/${SSOType}`).catch((err) => {
    throw err.response.data.message;
  });
  return data;
};

export const getLocalLoginData = async ({ email, pw }: { email: string; pw: string }) => {
  const { data } = await axios.post(`${SERVER_URL}/auth/signin`, { email, pw }).catch((err) => {
    throw err.response.data.message;
  });
  return data;
};
