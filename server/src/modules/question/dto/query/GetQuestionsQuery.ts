import { IsOptional, IsString } from 'class-validator';

export default class GetQuestionsQuery {
  @IsString()
  @IsOptional()
  public hashtag: string;

  @IsString()
  @IsOptional()
  public text: string;
}
