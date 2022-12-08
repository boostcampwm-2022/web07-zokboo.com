import { RootState } from '../store';
import { SolveState } from './interface';

const selectSolveData = (state: RootState): SolveState => state.solve;

export default selectSolveData;
