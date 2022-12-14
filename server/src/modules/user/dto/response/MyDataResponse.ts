import { ApiProperty } from '@nestjs/swagger';
import TestPaper from '../../../testPaper/domain/TestPaper';
import TestPaperSimpleResponse from '../../../testPaper/dto/response/TestPaperSimpleResponse';

export default class MyDataResponse {
  @ApiProperty()
  public workbookCount: number;

  @ApiProperty()
  public testCount: number;

  @ApiProperty()
  public testPaperCount: number;

  @ApiProperty()
  public reviewCount: number;

  @ApiProperty()
  public reviews: TestPaperSimpleResponse[];

  constructor(record: {
    workbookCount: number;
    testCount: number;
    testPaperCount: number;
    reviewCount: number;
    reviews: TestPaper[];
  }) {
    {
      this.workbookCount = record.workbookCount;
      this.testCount = record.testCount;
      this.testPaperCount = record.testPaperCount;
      this.reviewCount = record.reviewCount;
      this.reviews = record.reviews.map((tp) => new TestPaperSimpleResponse(tp));
    }
  }
}
