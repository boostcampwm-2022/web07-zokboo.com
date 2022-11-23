import { rest } from 'msw';
import PostCreateQuestionBody from '../../../types/question';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default [
  rest.post<PostCreateQuestionBody>(`${baseUrl}/question`, (req, res, ctx) => {
    const { question, questionType, answer, commentary, difficulty, hashtags } = req.body;
    const { userId } = req.cookies;

    if (userId) return res(ctx.status(200), ctx.json({ question, questionType, difficulty }));
    return res(ctx.status(400), ctx.cookie('userId', 'SeoJaeWan'));
  }),
];
