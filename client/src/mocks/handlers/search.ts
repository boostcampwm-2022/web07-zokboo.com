import { rest } from 'msw';
import search from '../data/search';

export default [
  rest.get('/workbooks/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(search.list));
  }),
];
