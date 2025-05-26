import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterClienteDto {
  @IsOptional()
  @IsString()
  Codigo?: string;

  @IsOptional()
  @IsString()
  Nome?: string;

  @IsOptional()
  @IsString()
  Cidade?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  CEP?: string;
}
