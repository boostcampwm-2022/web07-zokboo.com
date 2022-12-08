import { ApiProperty } from '@nestjs/swagger';
import TestPaper from '../../domain/TestPaper';

class CreateTestPaperResponse {
  @ApiProperty()
  public testPaperId: number;

  constructor(testPaper: TestPaper) {
    this.testPaperId = Number(testPaper.testPaperId);
  }
}

export default CreateTestPaperResponse;
