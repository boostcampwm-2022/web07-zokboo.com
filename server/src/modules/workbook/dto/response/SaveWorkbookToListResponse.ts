import { ApiProperty } from '@nestjs/swagger';
import WorkbookLike from '../../domain/WorkbookLike';

export default class SaveWorkbookToListResponse {
  @ApiProperty()
  public workbookId: bigint;

  @ApiProperty()
  public userId: bigint;

  constructor(record: WorkbookLike) {
    this.workbookId = record.workbookId;
    this.userId = record.userId;
  }
}
