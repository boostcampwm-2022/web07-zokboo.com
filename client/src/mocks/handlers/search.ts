import { rest } from 'msw';
import { SERVER_URL } from '../../utils/constants';
import search from '../data/search';

export default [
  rest.get(`${SERVER_URL}/workbooks`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(search.list));
  }),
];
