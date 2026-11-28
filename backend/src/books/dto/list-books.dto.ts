import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ListBooksDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() genre?: string;
  @IsOptional() @Transform(({ value }) => value === 'true') @IsBoolean() available?: boolean;
}
