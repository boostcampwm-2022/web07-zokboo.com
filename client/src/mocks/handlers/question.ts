import { rest } from 'msw';
import { PostCreateQuestionBody } from '../../types/question';
import { SERVER_URL } from '../../utils/constants';
import questionData from '../data/question';

let tempId = 0;

export default [
  rest.get(`${SERVER_URL}/questions`, (req, res, ctx) => {
    const hashtag = req.url.searchParams.get('hashtag');

    if (!hashtag) return res(ctx.status(400));

    const { search } = questionData;
    const result = search.filter((data) => data.hashtags[0] === hashtag);

    return res(ctx.status(200), ctx.json(result));
  }),
  rest.post<PostCreateQuestionBody>(`${SERVER_URL}/questions`, (req, res, ctx) => {
    const { question, questionType, difficulty, hashtags } = req.body;
    const { userId } = req.cookies;
    tempId += 1;

    if (userId)
      return res(ctx.status(200), ctx.json({ questionId: tempId, question, questionType, difficulty, hashtags }));
    return res(ctx.status(400), ctx.cookie('userId', 'SeoJaeWan'));
  }),
];
