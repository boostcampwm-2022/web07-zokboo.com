import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import CreateWorkbookTestRequest from './CreateWorkbookTestRequest';

class CreateTestRequest {
  @ApiProperty()
  @IsNumber()
  public timeout: number;

  @ApiProperty()
  @IsString()
  public title: string;

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
