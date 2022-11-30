import { IsNumber } from 'class-validator';

class CreateWorkbookTestRequest {
  @IsNumber()
  public workbookId: number;

  @IsNumber()
  public count: number;
}

export default CreateWorkbookTestRequest;
