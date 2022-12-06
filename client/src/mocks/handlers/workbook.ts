import { rest } from 'msw';
import { PostCreateWorkbookBody } from '../../types/workbook';
import { SERVER_URL } from '../../utils/constants';
import workbookData from '../data/workbook';

export default [
  rest.get(`${SERVER_URL}/workbooks/:id/questions`, (req, res, ctx) => {
    const { id } = req.params;

    const result = workbookData.workbookList.filter(({ workbookId }) => workbookId.toString() === id);

    return res(ctx.status(200), ctx.json(result[0]));
  }),
  rest.get(`${SERVER_URL}/workbooks`, (req, res, ctx) => {
    const searchTitle = req.url.searchParams.get('title');

    const result = workbookData.workbookList.filter(({ title }) => title === searchTitle);

    return res(ctx.status(200), ctx.json(result));
  }),
  rest.post<PostCreateWorkbookBody>(`${SERVER_URL}/workbooks`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch(`${SERVER_URL}/workbooks/:workbookId/:questionId`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
