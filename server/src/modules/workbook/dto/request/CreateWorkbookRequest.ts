import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

class CreateWorkbookRequest {
  @IsString()
  @ApiProperty()
  public title: string;

  @IsString()
  @ApiProperty()
  public description: string;

  @IsBoolean()
  @ApiProperty()
  public isPublic: boolean;

  @IsNumber(
    {},
    {
      each: true,
    },
  )
  @ApiProperty()
  public questions: number[];
}

export default CreateWorkbookRequest;
