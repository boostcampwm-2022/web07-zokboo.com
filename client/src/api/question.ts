import axios from 'axios';
import { PostCreateQuestionBody } from '../types/question';
import { SERVER_URL } from '../utils/constants';

export const getQuestion = async (query: { type: string; value: string }) => {
  const { data } = await axios.get(`${SERVER_URL}/questions?${new URLSearchParams({ [query.type]: query.value })}`);

  return data;
};

export const createQuestion = async (body: PostCreateQuestionBody) => {
  const { data } = await axios.post(`${SERVER_URL}/questions`, body, { withCredentials: true });

  return data;
};
