// src/auth/dto/auth.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
// It's best to import Role directly from Prisma in the backend DTOs
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString({ message: 'O nome deve ser uma string.' })
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  email: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString({ message: 'A senha deve ser uma string.' })
  password: string;
}

// Convert LoginResponseDto to a class
export class LoginResponseDto {
  @ApiProperty({ example: 1, description: 'ID do usuário logado.' })
  id: number;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpv...',
    description: 'Token de acesso JWT que deve ser usado em requisições subsequentes.',
  })
  accessToken: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email do usuário logado.' })
  email: string;

  @ApiProperty({ enum: Role, example: Role.USER, description: 'Papel (role) do usuário logado.' })
  role: Role;
}