import { rest } from 'msw';
import { SERVER_URL } from '../../utils/constants';
import search from '../data/search';

export default [
  rest.get(`${SERVER_URL}/workbooks`, (req, res, ctx) => {
    const result = { msg: 'mock data 요청 성공', data: search.list };
    return res(ctx.status(200), ctx.json(result));
  }),
];
