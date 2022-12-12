import axios from 'axios';
import { PutGradeTestPaperBody } from '../types/test';
import { SERVER_URL } from '../utils/constants';

export const gradeTestPaper = async (body: PutGradeTestPaperBody) => {
  const { testPaperQuestionId } = body;
  const { data } = await axios.put(`${SERVER_URL}/testpaper/${testPaperQuestionId}`, body);

  return data;
};

export default gradeTestPaper;
