import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateBookDto {
  @IsOptional() @IsString() @IsNotEmpty() title?: string;
  @IsOptional() @IsString() @IsNotEmpty() author?: string;
  @IsOptional() @IsString() @IsNotEmpty() isbn?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) totalCopies?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) availableCopies?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) genreId?: number;
  @IsOptional() @IsString() content?: string | null;
}
