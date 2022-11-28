import axios from 'axios';
import { PostCreateQuestionBody } from '../../types/workbook';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getQuestion = async (query: { type: string; value: string }) => {
  console.log('???');
  const { data } = await axios.get(`${baseUrl}/questions?${new URLSearchParams({ [query.type]: query.value })}`);

  return data;
};

export const createQuestion = async (body: PostCreateQuestionBody) => {
  const { data } = await axios.post(`${baseUrl}/questions`, body, { withCredentials: true });

  return data;
};
