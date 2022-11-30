import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

class CreateWorkbookTestRequest {
  @ApiProperty()
  @IsNumber()
  public workbookId: number;

  @ApiProperty()
  @IsNumber()
  public count: number;
}

export default CreateWorkbookTestRequest;
