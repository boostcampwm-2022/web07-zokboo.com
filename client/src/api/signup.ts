import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../utils/constants';

interface signupProps {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
}

const postSignup = async (signupInput: signupProps) => {
  const { data } = await axios
    .post(`${SERVER_URL}/auth/signup`, signupInput, { withCredentials: true })
    .catch((res) => {
      throw toast.error(res.response.data.message);
    });

  return data;
};

export default postSignup;
