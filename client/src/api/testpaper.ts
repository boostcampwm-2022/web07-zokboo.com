import { QueryFunctionContext } from 'react-query';
import axios from './index';
import { PutGradeTestPaperProps } from '../types/test';
import { SERVER_URL } from '../utils/constants';

export const gradeTestPaper = async (props: PutGradeTestPaperProps) => {
  const { body, testPaperId } = props;
  const { data } = await axios.put(`${SERVER_URL}/testpaper/${testPaperId}`, body);

  return data;
};

export const getTestPaper = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, params] = queryKey;

  const { data } = await axios.get(`${SERVER_URL}/testpaper/${params}`, { withCredentials: true });

  return data;
};

export default gradeTestPaper;
