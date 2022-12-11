import { rest } from 'msw';
import { PostCreateWorkbookBody } from '../../types/workbook';
import { SERVER_URL } from '../../utils/constants';
import workbookData from '../data/workbook';

export default [
  rest.get(`/workbooks/:id/questions`, (req, res, ctx) => {
    const { id } = req.params;

    const result = workbookData.workbookList.filter(({ workbookId }) => workbookId.toString() === id);

    return res(ctx.status(200), ctx.json(result[0]));
  }),
  rest.get(`/workbooks`, (req, res, ctx) => {
    const searchTitle = req.url.searchParams.get('title');

    const result = workbookData.workbookList.filter(({ title }) => title === searchTitle);

    return res(ctx.status(200), ctx.json(result));
  }),
  rest.post<PostCreateWorkbookBody>(`/workbooks`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch(`/workbooks/:workbookId/:questionId`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`/workbooks/:workbookId`, (req, res, ctx) => {
    const { workbookId } = req.params;
    const [result] = workbookData.workbookList.filter(({ workbookId: id }) => Number(workbookId) === id);
    return res(ctx.status(200), ctx.json(result));
  }),
];
