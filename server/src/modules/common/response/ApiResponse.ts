import { ApiProperty } from '@nestjs/swagger';

class ApiResponse<T> {
  @ApiProperty()
  public msg: string;

  public data: T;

  constructor(msg: string, data: T) {
    this.msg = msg;
    this.data = data;
  }
}

export default ApiResponse;
