import { QueryFunctionContext } from 'react-query';
import axios from './index';
import { PatchSolveWorkbookQuestionProps, PostCreateWorkbookBody, PostWorkbookSave } from '../types/workbook';
import { SERVER_URL } from '../utils/constants';

export const getWorkbook = async (params: number) => {
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${params}/questions`);

  return data;
};

export const getWorkbookListByTitle = async (title: string) => {
  const { data } = await axios.get(`${SERVER_URL}/workbooks?title=${title}`);

  return data;
};

export const getMyWorkbookData = async ({ queryKey }: QueryFunctionContext) => {
  const [type] = queryKey;
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${type}`);

  return data;
};

export const getWorkbookById = async ({ queryKey }: QueryFunctionContext) => {
  const workbookId = queryKey[1];
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${workbookId}`);
  return data;
};

export const createWorkbook = async (body: PostCreateWorkbookBody) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks`, body);

  return data;
};

export const solveWorkbookQuestion = async (props: PatchSolveWorkbookQuestionProps) => {
  const { params, body } = props;
  const { workbookId, workbookQuestionId } = params;
  const { data } = await axios.patch(`${SERVER_URL}/workbooks/${workbookId}/${workbookQuestionId}`, body);

  return data;
};

export const saveWorkbook = async ({ workbookId }: PostWorkbookSave) => {
  const { data } = await axios.post(`${SERVER_URL}/workbooks/${workbookId}/save`, {
    withCredentials: true,
  });

  return data;
};
