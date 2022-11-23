import { IsBoolean, IsNumber, IsString } from 'class-validator';

class CreateWorkbookRequest {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsBoolean()
  public isPublic: boolean;

  @IsNumber(
    {},
    {
      each: true,
    },
  )
  public questions: number[];
}

export default CreateWorkbookRequest;
