import Test from '../../domain/Test';
import WorkbookTestSimpleResponse from './WorkbookTestSimpleResponse';

class TestSimpleResponse {
  public testId: number;
  public totalCount: number;
  public timeout: number;
  public workbooks: WorkbookTestSimpleResponse[];

  constructor(test: Test) {
    this.testId = Number(test.testId);
    this.totalCount = test.totalCount;
    this.timeout = test.timeout;
    this.workbooks = test.workbooks.map((w) => new WorkbookTestSimpleResponse(w));
  }
}

export default TestSimpleResponse;
