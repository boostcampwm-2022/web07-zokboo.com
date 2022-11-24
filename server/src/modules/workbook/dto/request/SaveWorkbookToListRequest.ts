import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SaveWorkbookToListRequest {
  @ApiProperty()
  @IsNumber()
  public workbookId: bigint;
}
