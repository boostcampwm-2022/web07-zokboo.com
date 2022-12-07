import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import { SERVER_URL } from '../utils/constants';

export const checkEmailAuth = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, token] = queryKey;

  const { data } = await axios.post(`${SERVER_URL}/auth/email?token=${token}`);

  return data;
};

export default checkEmailAuth;
