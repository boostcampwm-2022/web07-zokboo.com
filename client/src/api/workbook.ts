import axios from 'axios';
import { PostCreateWorkBookBody } from '../types/workbook';
import { SERVER_URL } from '../utils/constants';

export const getWorkbookList = async (params: string) => {
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${params}`);

  return data;
};

export const createWorkbook = async (body: PostCreateWorkBookBody) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks`, body, { withCredentials: true });

  return data;
};
