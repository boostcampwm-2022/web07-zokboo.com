import { ApiProperty } from '@nestjs/swagger';
import User from 'src/modules/user/domain/User';
import SigninResponse from 'src/modules/user/dto/response/SigninResponse';
import Workbook from '../../domain/Workbook';
import WorkbookSimpleResponse from './WorkbookSimpleResponse';

export default class WorkbookSearchResponse extends WorkbookSimpleResponse {
  @ApiProperty()
  public user: SigninResponse;

  constructor(workbook: Workbook) {
    super(workbook);
    this.user = new SigninResponse(workbook.user);
  }
}
