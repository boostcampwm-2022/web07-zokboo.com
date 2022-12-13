import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import GradeTestPaperQuestionRequest from './GradeTestPaperQuestionRequest';

class GradeTestPaperRequest {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(GradeTestPaperQuestionRequest),
    },
  })
  @ValidateNested({
    each: true,
  })
  @Type(() => GradeTestPaperQuestionRequest)
  public questions: GradeTestPaperQuestionRequest[];
}

export default GradeTestPaperRequest;
