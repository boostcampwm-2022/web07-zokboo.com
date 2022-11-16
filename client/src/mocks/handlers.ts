// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import researchMockData from './researchMockData';

const handlers = [
  // 문제집 검색결과 요청 api
  rest.get('/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(researchMockData));
  }),
];

export default handlers;
