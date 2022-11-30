import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiDefaultResponse, getSchemaPath } from '@nestjs/swagger';
import ApiResponse from 'src/modules/common/response/ApiResponse';

export const ApiSingleResponse = <T extends Type<any>>(status: HttpStatus, model: T, description?: string) => {
  return applyDecorators(
    ApiDefaultResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiMultiResponse = <T extends Type<any>>(status: HttpStatus, model: T, description?: string) => {
  return applyDecorators(
    ApiDefaultResponse({
      status,
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(model),
                },
              },
            },
          },
        ],
      },
    }),
  );
};
