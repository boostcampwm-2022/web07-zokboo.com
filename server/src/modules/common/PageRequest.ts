import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export default class PageRequest {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  public page: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  public size: number;
}
