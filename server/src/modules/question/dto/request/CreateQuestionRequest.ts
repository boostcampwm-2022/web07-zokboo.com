import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import QuestionType from '../../enum/QuestionType';

class CreateQuestionRequest {
  @ApiProperty()
  @IsString()
  public question: string;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'Question Type',
  })
  @IsString()
  public questionType: QuestionType;

  @ApiProperty()
  @IsString()
  public answer: string;

  @ApiProperty()
  @IsString()
  public commentary: string;

  @ApiProperty()
  @IsNumber()
  public difficulty: number;

  @ApiProperty()
  @IsString({
    each: true,
  })
  public hashtags: string[];

  @ApiProperty()
  @IsString({
    each: true,
  })
  public options: string[];
}

export default CreateQuestionRequest;
