import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import TestSimpleResponse from 'src/modules/test/dto/response/TestSimpleResponse';
import TestPaper from '../../domain/TestPaper';
import TestPaperState from '../../enum/TestPaperState';

class TestPaperSimpleResponse {
  @ApiProperty()
  public testPaperId: number;

  @ApiProperty({
    enum: TestPaperState,
    enumName: 'Test Paper State',
  })
  public state: TestPaperState;

  @ApiProperty()
  public correctCount: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public minutes: number;

  @ApiProperty()
  public seconds: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({})
  public test: TestSimpleResponse;

  constructor(testPaper: TestPaper) {
    this.testPaperId = Number(testPaper.testPaperId);
    this.state = testPaper.state;
    this.correctCount = testPaper.correctCount;
    this.minutes = Math.floor(testPaper.timeout / 60);
    this.seconds = testPaper.timeout % 60;
    this.title = testPaper.title;
    this.createdAt = testPaper.createdAt;
    this.updatedAt = testPaper.updatedAt;
    this.test = new TestSimpleResponse(testPaper.test);
  }
}

export default TestPaperSimpleResponse;
