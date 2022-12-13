import { SERVER_URL } from '../utils/constants';
import axios from './index';

export const postQuestionLike = async (questionId: string) => {
  const { data } = await axios.post(`${SERVER_URL}/questions/${questionId}/like`);
  return data;
};

export const postQuestionDisLike = async (questionId: string) => {
  const { data } = await axios.post(`${SERVER_URL}/questions/${questionId}/dislike`);
  return data;
};

export const postWorkbookLike = async (workbookId: string) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks/${workbookId}/like`);
  return data;
};

export const postWorkbookDisLike = async (workbookId: string) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks/${workbookId}/dislike`);
  return data;
};
