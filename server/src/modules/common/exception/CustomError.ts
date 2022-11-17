class CustomError extends Error {
  public status: number;
  public code: string;
  constructor(msg: string, status = 400, code = '') {
    super(msg);
    this.status = status;
    this.code = code;
  }
}

export default CustomError;
