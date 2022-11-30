import { IsNumber, ValidateNested } from 'class-validator';
import CreateWorkbookTestRequest from './CreateWorkbookTestRequest';

class CreateTestRequest {
  @IsNumber()
  public timeout: number;

  @ValidateNested({
    each: true,
  })
  public workbooks: CreateWorkbookTestRequest[];
}

export default CreateTestRequest;
