import { QueryFunctionContext } from 'react-query';
import { SERVER_URL } from '../utils/constants';
import axios from './index';
import { PatchMarkGradeTestPaperProps, PutGradeTestPaperProps } from '../types/test';

export const getMyTestPaper = async () => {
  const { data } = await axios.get(`${SERVER_URL}/testpaper/my`);
  return data;
};

export const gradeTestPaper = async (props: PutGradeTestPaperProps) => {
  const { body, testPaperId } = props;
  const { data } = await axios.put(`${SERVER_URL}/testpaper/${testPaperId}`, body);

  return data;
};

export const markGradeTestPaper = async (props: PatchMarkGradeTestPaperProps) => {
  const { body, testPaperId } = props;
  const { data } = await axios.patch(`${SERVER_URL}/testpaper/${testPaperId}`, body);

  return data;
};

export const getTestPaper = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, params] = queryKey;

  const { data } = await axios.get(`${SERVER_URL}/testpaper/${params}`, { withCredentials: true });

  return data;
};

export default gradeTestPaper;
