import { QueryFunctionContext } from 'react-query';
import axios from './index';
import PostResetPasswordBody from '../types/auth';
import { SERVER_URL } from '../utils/constants';

export const checkEmailAuth = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, token] = queryKey;

  const { data } = await axios.post(`${SERVER_URL}/auth/email?token=${token}`);

  return data;
};

export const resetPassword = async (body: PostResetPasswordBody) => {
  const { data } = await axios.post(`${SERVER_URL}/auth/reset/password`, body);

  return data;
};

export default checkEmailAuth;
