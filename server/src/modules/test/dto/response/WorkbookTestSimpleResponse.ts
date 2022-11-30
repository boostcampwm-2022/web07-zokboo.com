import WorkbookSimpleResponse from '../../../workbook/dto/response/WorkbookSimpleResponse';
import WorkbookTest from '../../domain/WorkbookTest';

class WorkbookTestSimpleResponse {
  public workbook: WorkbookSimpleResponse;
  public count: number;

  constructor(workbookTest: WorkbookTest) {
    this.workbook = new WorkbookSimpleResponse(workbookTest.workbook);
    this.count = workbookTest.count;
  }
}

export default WorkbookTestSimpleResponse;
