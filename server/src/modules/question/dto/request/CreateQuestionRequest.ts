import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
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
  @IsString()
  public difficulty: string;

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

  @ApiProperty()
  @IsObject({
    each: true,
  })
  public images: Express.Multer.File[];
}

export default CreateQuestionRequest;
