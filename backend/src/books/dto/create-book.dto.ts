import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString() @IsNotEmpty() title!: string;
  @IsString() @IsNotEmpty() author!: string;
  @IsString() @IsNotEmpty() isbn!: string;
  @Type(() => Number) @IsInt() @Min(0) totalCopies!: number;
  @Type(() => Number) @IsInt() @Min(0) availableCopies!: number;
  @Type(() => Number) @IsInt() @Min(1) genreId!: number;
  @IsOptional() @IsString() content?: string | null;
}
