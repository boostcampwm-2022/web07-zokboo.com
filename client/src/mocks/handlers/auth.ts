import { rest } from 'msw';
import { SERVER_URL } from '../../utils/constants';

export default [
  rest.post(`${SERVER_URL}/auth/email`, (req, res, ctx) => {
    const token = req.url.searchParams.get('token');

    if (token === 'error') return res(ctx.status(400));
    return res(ctx.status(200));
  }),

  rest.post(`${SERVER_URL}/auth/reset/password`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post(`${SERVER_URL}/auth/signin`, (req, res, ctx) => {
    const data = { avatar: 'mockAvatar', userId: 'mockUserId', nickname: 'mockNickname' };
    return res(ctx.status(200), ctx.json({ msg: 'msw success', data }));
  }),
];
