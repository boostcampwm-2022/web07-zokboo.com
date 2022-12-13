import { rest } from 'msw';
import { PostCreateTestBody } from '../../types/test';
import { SERVER_URL } from '../../utils/constants';
import myTestData from '../data/myTest';
import test from '../data/test';

export default [
  rest.get(`${SERVER_URL}/testpaper/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const result = test.testList.filter(({ testPaperId }) => testPaperId.toString() === id);

    return res(ctx.status(200), ctx.json(result[0]));
  }),
  rest.post<PostCreateTestBody>(`${SERVER_URL}/tests`, (req, res, ctx) => {
    const { title, minutes, seconds, workbooks } = req.body;

    if (title) {
      return res(ctx.status(200));
    }
    return res(ctx.status(400));
  }),

  rest.get(`${SERVER_URL}/tests/my`, (req, res, ctx) => {
    const result = { msg: 'my test mock data 조회 성공', data: myTestData };
    return res(ctx.status(200), ctx.json(result));
  }),
];
