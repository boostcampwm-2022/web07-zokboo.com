import { rest } from 'msw';
import search from '../data/search';

export default [
  rest.get('/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(search.list));
  }),
];
