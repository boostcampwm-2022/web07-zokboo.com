import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import { PostCreateTestBody } from '../types/test';
import { SERVER_URL } from '../utils/constants';

export const createTest = async (body: PostCreateTestBody) => {
  const { data } = await axios.post(`${SERVER_URL}/tests`, body, { withCredentials: true });

  return data;
};

export const getTest = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, params] = queryKey;

  const { data } = await axios.get(`${SERVER_URL}/tests/${params}/questions`, { withCredentials: true });

  return data;
};

export default createTest;
