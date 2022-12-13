import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import MarkTestPaperQuestionRequest from './MarkTestPaperQuestionRequest';

class MarkTestPaperRequest {
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(MarkTestPaperQuestionRequest),
    },
  })
  @ValidateNested({
    each: true,
  })
  @Type(() => MarkTestPaperQuestionRequest)
  public questions: MarkTestPaperQuestionRequest[];
}

export default MarkTestPaperRequest;
