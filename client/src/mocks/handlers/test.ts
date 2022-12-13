import { rest } from 'msw';
import { PostCreateTestBody } from '../../types/test';
import { SERVER_URL } from '../../utils/constants';
import test from '../data/test';

export default [
  rest.get(`${SERVER_URL}/testpaper/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const result = test.testList.filter(({ testPaperId }) => testPaperId.toString() === id);

    return res(ctx.status(200), ctx.json(result[0]));
  }),
  rest.post<PostCreateTestBody>(`${SERVER_URL}/tests`, (req, res, ctx) => {
    const { title } = req.body;

    if (title) {
      return res(ctx.status(200));
    }
    return res(ctx.status(400));
  }),
];
