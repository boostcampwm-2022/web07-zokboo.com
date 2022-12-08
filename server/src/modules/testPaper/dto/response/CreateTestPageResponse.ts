import { ApiProperty } from '@nestjs/swagger';
import TestPaper from '../../domain/testPaper';

class CreateTestPaperResponse {
  @ApiProperty()
  public testPaperId: number;

  constructor(testPaper: TestPaper) {
    this.testPaperId = Number(testPaper.testPaperId);
  }
}

export default CreateTestPaperResponse;
