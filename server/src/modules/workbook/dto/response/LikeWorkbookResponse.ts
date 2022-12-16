import { ApiProperty } from '@nestjs/swagger';
import WorkbookLike from '../../domain/WorkbookLike';

export default class LikeWorkbookResponse {
  @ApiProperty()
  public workbookId: number;

  @ApiProperty()
  public userId: number;

  constructor(record: WorkbookLike) {
    this.workbookId = Number(record.workbookId);
    this.userId = Number(record.userId);
  }
}
