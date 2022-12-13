import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import CreateWorkbookTestRequest from './CreateWorkbookTestRequest';

class CreateTestRequest {
  @ApiProperty()
  @IsInt()
  public minutes: number;

  @ApiProperty()
  @IsInt()
  public seconds: number;

  @ApiProperty()
  @IsString()
  public title: string;

  @Type(() => CreateWorkbookTestRequest)
  @ApiProperty({
    type: 'array',
    items: {
      $ref: getSchemaPath(CreateWorkbookTestRequest),
    },
  })
  @ValidateNested({
    each: true,
  })
  public workbooks: CreateWorkbookTestRequest[];
}

export default CreateTestRequest;
