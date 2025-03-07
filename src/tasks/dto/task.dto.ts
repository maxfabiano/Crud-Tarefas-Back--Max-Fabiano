import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Comprar leite' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Leite integral no supermercado da esquina' })
  @IsOptional()
  @IsString()
  body: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;
}

export class UpdateTaskDto {
  @ApiProperty({ example: 'Comprar pão' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Pão francês na padaria da rua principal' })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}