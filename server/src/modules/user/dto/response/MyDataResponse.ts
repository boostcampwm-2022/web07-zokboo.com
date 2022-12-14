import { ApiProperty } from '@nestjs/swagger';

export default class MyDataResponse {
  @ApiProperty()
  public workbookCount: number;

  @ApiProperty()
  public testCount: number;

  @ApiProperty()
  public testPaperCount: number;

  @ApiProperty()
  public reviewCount: number;

  constructor(record: { workbookCount: number; testCount: number; testPaperCount: number; reviewCount: number }) {
    {
      this.workbookCount = record.workbookCount;
      this.testCount = record.testCount;
      this.testPaperCount = record.testPaperCount;
      this.reviewCount = record.reviewCount;
    }
  }
}
