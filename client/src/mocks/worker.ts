// eslint 설정 만져주면 되긴 하는데 팀원과의 협의가 필요할것 같아서 일단은 disable 주석달기.
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';
import handlers from './handlers';

const worker = setupWorker(...handlers);

export default worker;
