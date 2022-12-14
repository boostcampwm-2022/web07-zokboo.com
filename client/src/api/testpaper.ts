import { QueryFunctionContext } from 'react-query';
import { SERVER_URL } from '../utils/constants';
import axios from './index';
import { PatchMarkGradeTestPaperProps, PutGradeTestPaperProps } from '../types/test';

export const getMyTestPaper = async () => {
  const { data } = await axios.get(`${SERVER_URL}/testpapers/?state=SOLVING`);
  return data;
};

export const gradeTestPaper = async (props: PutGradeTestPaperProps) => {
  const { body, testPaperId } = props;
  const { data } = await axios.put(`${SERVER_URL}/testpapers/${testPaperId}`, body);

  return data;
};

export const markGradeTestPaper = async (props: PatchMarkGradeTestPaperProps) => {
  const { body, testPaperId } = props;
  const { data } = await axios.patch(`${SERVER_URL}/testpapers/${testPaperId}`, body);

  return data;
};

export const getTestPaper = async ({ queryKey }: QueryFunctionContext) => {
  const params = queryKey[1];

  const { data } = await axios.get(`${SERVER_URL}/testpapers/${params}`);

  return data;
};

export default gradeTestPaper;
