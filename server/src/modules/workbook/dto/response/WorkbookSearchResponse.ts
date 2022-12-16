import { ApiProperty } from '@nestjs/swagger';
import User from 'src/modules/user/domain/User';
import SigninResponse from 'src/modules/user/dto/response/SigninResponse';
import Workbook from '../../domain/Workbook';
import WorkbookSimpleResponse from './WorkbookSimpleResponse';

export default class WorkbookSearchResponse extends WorkbookSimpleResponse {
  @ApiProperty()
  public user: SigninResponse;

  @ApiProperty()
  public liked: boolean;

  constructor(workbook: Workbook, liked: boolean) {
    super(workbook);
    this.user = new SigninResponse(workbook.user);
    this.liked = liked;
  }
}
