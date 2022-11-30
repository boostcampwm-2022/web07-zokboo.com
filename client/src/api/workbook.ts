import axios from 'axios';
import { PatchSolveWorkbookQuestionProps, PostCreateWorkBookBody } from '../types/workbook';
import { SERVER_URL } from '../utils/constants';

export const getWorkbookList = async (params: number) => {
  const { data } = await axios.get(`${SERVER_URL}/workbooks/${params}/questions`);

  return data;
};

export const createWorkbook = async (body: PostCreateWorkBookBody) => {
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
