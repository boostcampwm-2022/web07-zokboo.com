import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class DuplicateWorkbookRequest {
  @ApiProperty()
  @IsNumber()
  public workbookId: bigint;
}
