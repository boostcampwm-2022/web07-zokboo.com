import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import { toast } from 'react-toastify';
import { PostResetPasswordBody, signupProps } from '../types/auth';
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

export const getSSOData = async (SSOType: string) => {
  const { data } = await axios.get(`${SERVER_URL}/auth/${SSOType}`, { withCredentials: true }).catch((err) => {
    throw err.response.data.message;
  });
  return data;
};

export const getLocalLoginData = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await axios
    .post(`${SERVER_URL}/auth/signin`, { email, password }, { withCredentials: true })
    .catch((err) => {
      throw err.response.data.message;
    });

  return data;
};

export const postSignup = async (signupInput: signupProps) => {
  const { data } = await axios
    .post(`${SERVER_URL}/auth/signup`, signupInput, { withCredentials: true })
    .catch((res) => {
      throw toast.error(res.response.data.message);
    });

  return data;
};
