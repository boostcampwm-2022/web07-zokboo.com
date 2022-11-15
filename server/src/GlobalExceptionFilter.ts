import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception.constructor);
    switch (exception.constructor) {
      case HttpException: // for HttpException
        status = (exception as HttpException).getStatus();
        break;

      default: // default
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    response.status(status).json({
      statusCode: status,
      message: (exception as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
