import axios from 'axios';
import PostCreateWorkBookBody from '../types/workbook';
import SERVER_URL from '../utils/constants';

const createWorkbook = async (body: PostCreateWorkBookBody) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks`, body, { withCredentials: true });

  return data;
};

export default createWorkbook;
