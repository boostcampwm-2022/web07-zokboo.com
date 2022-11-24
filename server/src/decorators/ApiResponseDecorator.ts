import { applyDecorators, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import ApiResponse from 'src/modules/common/response/ApiResponse';

const ApiResponseDetails = <T extends Type<any>>(model: T, description?: string) => {
  return {
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
  };
};

export const Api200Response = <T extends Type<any>>(model: T, description?: string) => {
  return applyDecorators(ApiOkResponse(ApiResponseDetails(model, description)));
};

export const Api201Response = <T extends Type<any>>(model: T, description?: string) => {
  return applyDecorators(ApiCreatedResponse(ApiResponseDetails(model, description)));
};
