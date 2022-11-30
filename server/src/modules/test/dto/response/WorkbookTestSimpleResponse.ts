import { ApiProperty } from '@nestjs/swagger';
import WorkbookSimpleResponse from '../../../workbook/dto/response/WorkbookSimpleResponse';
import WorkbookTest from '../../domain/WorkbookTest';

class WorkbookTestSimpleResponse {
  @ApiProperty()
  public workbook: WorkbookSimpleResponse;

  @ApiProperty()
  public count: number;

  constructor(workbookTest: WorkbookTest) {
    this.workbook = new WorkbookSimpleResponse(workbookTest.workbook);
    this.count = workbookTest.count;
  }
}

export default WorkbookTestSimpleResponse;
