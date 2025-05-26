import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  idUsuario: number;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(15)
  Codigo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  Nome: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  CPF_CNPJ: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  CEP: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  Logradouro: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  Endereco: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  Numero: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  Bairro: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  Cidade: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  UF: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  Complemento?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  Fone?: string;

  @IsNotEmpty()
  @IsNumber()
  LimiteCredito: number;

  @IsNotEmpty()
  @IsDateString()
  Validade: string;
}
