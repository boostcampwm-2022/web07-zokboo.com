import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import { PatchSolveWorkbookQuestionProps, PostCreateWorkbookBody, PostWorkbookSave } from '../types/workbook';
import { SERVER_URL } from '../utils/constants';

export const getWorkbook = async (params: number) => {
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${params}/questions`, { withCredentials: true });

  return data;
};

export const getWorkbookListByTitle = async (title: string) => {
  const { data } = await axios.get(`${SERVER_URL}/workbooks?title=${title}`, { withCredentials: true });

  return data;
};

export const getWorkbookById = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, workbookId] = queryKey;
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${workbookId}`);
  return data;
};

export const createWorkbook = async (body: PostCreateWorkbookBody) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks`, body, { withCredentials: true });

  return data;
};

export const solveWorkbookQuestion = async (props: PatchSolveWorkbookQuestionProps) => {
  const { params, body } = props;
  const { workbookId, workbookQuestionId } = params;
  const { data } = await axios.patch(`${SERVER_URL}/workbooks/${workbookId}/${workbookQuestionId}`, body, {
    withCredentials: true,
  });

  return data;
};

export const saveWorkbook = async (body: PostWorkbookSave) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks/save`, body, {
    withCredentials: true,
  });

  return data;
};
