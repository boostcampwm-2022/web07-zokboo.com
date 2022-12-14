import axios from './index';
import { SERVER_URL } from '../utils/constants';

export const updateProfileImage = async (body: FormData) => {
  const { data } = await axios.patch(`${SERVER_URL}/users/image`, body);

  return data;
};

export const getUserData = async () => {
  const { data } = await axios.get(`${SERVER_URL}/users/my`);

  return data;
};
