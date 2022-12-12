import { SERVER_URL } from '../utils/constants';
import axios from './index';

const getTestPaper = async () => {
  const { data } = await axios.get(`${SERVER_URL}/testpaper/my`);
  return data;
};

export default getTestPaper;
