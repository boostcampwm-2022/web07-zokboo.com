// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import problem from '../../data/problem';

export default [
  rest.get('/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(problem.search));
  }),
];
