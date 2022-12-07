import axios from 'axios';
import { PostCreateTestBody } from '../types/test';
import { SERVER_URL } from '../utils/constants';

export const createTest = async (body: PostCreateTestBody) => {
  const { data } = await axios.post(`${SERVER_URL}/tests`, body, { withCredentials: true });

  return data;
};

export default createTest;
