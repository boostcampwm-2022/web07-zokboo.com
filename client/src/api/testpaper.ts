import axios from 'axios';
import { PutGradeTestPaperProps } from '../types/test';
import { SERVER_URL } from '../utils/constants';

export const gradeTestPaper = async (props: PutGradeTestPaperProps) => {
  const { body, testPaperId } = props;
  const { data } = await axios.put(`${SERVER_URL}/testpaper/${testPaperId}`, body);

  return data;
};

export default gradeTestPaper;
