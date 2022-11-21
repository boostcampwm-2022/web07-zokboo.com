import { IsNumber, IsString } from 'class-validator';

class CreateQuestionRequest {
  @IsString()
  public question: string;
  @IsString()
  public questionType: string;
  @IsString()
  public answer: string;
  @IsString()
  public commentary: string;
  @IsNumber()
  public difficulty: number;
  @IsString({
    each: true,
  })
  public hashtags: string[];
  @IsString({
    each: true,
  })
  public options: string[];
}

export default CreateQuestionRequest;
