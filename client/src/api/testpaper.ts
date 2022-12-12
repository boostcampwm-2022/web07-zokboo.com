import { QueryFunctionContext } from 'react-query';
import { SERVER_URL } from '../utils/constants';
import axios from './index';

const getTestPaper = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, testPaperId] = queryKey;
  const { data } = await axios.get(`${SERVER_URL}/testpaper/${testPaperId}`);
  return data;
};

export default getTestPaper;
