import axios from './index';
import { SERVER_URL } from '../utils/constants';

export const updateProfileImage = async (body: FormData) => {
  const { data } = await axios.patch(`${SERVER_URL}/users/image`, body);

  return data;
};

export default updateProfileImage;
