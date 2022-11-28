import axios from 'axios';
import { PostCreateQuestionBody } from '../../types/workbook';

const baseUrl = process.env.REACT_APP_BASE_URL;

const getQuestion = async (hashTag: string) => {
  const { data } = await axios.get(`${baseUrl}?hashtag=${hashTag}`);

  return data;
};

const createQuestion = async (body: PostCreateQuestionBody) => {
  const { data } = await axios.post(`${baseUrl}/questions`, body, { withCredentials: true });

  return data;
};

export default createQuestion;
