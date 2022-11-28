import { setupWorker } from 'msw';
import handlers from './handlers';

console.log(handlers);

const worker = setupWorker(...handlers);

export default worker;
