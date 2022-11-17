export default class ApiResponse<T> {
  public msg: string;
  public data: T | undefined;
  constructor(msg: string, data?: T) {
    this.msg = msg;
    this.data = data;
  }
}
