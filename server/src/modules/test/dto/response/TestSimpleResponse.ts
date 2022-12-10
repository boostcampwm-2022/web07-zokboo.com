import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import Test from '../../domain/Test';
import WorkbookTestSimpleResponse from './WorkbookTestSimpleResponse';

class TestSimpleResponse {
  @ApiProperty()
  public testId: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public totalCount: number;

  @ApiProperty()
  public minutes: number;

  @ApiProperty()
  public seconds: number;

  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(WorkbookTestSimpleResponse),
    },
  })
  public workbooks: WorkbookTestSimpleResponse[];

  constructor(test: Test) {
    this.testId = Number(test.testId);
    this.title = test.title;
    this.totalCount = test.totalCount;
    this.minutes = Math.floor(test.timeout / 60);
    this.seconds = test.timeout % 60;
    this.workbooks = test.workbooks.map((w) => new WorkbookTestSimpleResponse(w));
  }
}

export default TestSimpleResponse;
