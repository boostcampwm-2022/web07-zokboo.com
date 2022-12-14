import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class ReviewQuestionRequest {
  @ApiProperty()
  @IsString()
  public review: string;
}

export default ReviewQuestionRequest;
