import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';
import CreateWorkbookTestRequest from './CreateWorkbookTestRequest';

class CreateTestRequest {
  @ApiProperty()
  @IsNumber()
  public timeout: number;

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
