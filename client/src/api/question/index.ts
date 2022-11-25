import axios from 'axios';
import { PostCreateQuestionBody } from '../../types/workbook';

const baseUrl = process.env.REACT_APP_BASE_URL;

const createQuestion = async (body: PostCreateQuestionBody) => {
  const { data } = await axios.post(`${baseUrl}/questions`, body, { withCredentials: true });

  return data;
};

export default createQuestion;
