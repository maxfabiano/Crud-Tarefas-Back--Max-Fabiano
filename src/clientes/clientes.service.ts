import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cliente, Prisma } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { FilterClienteDto } from './dto/filter-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClienteDto): Promise<Cliente> {
    return this.prisma.cliente.create({
      data: {
        idUsuario: dto.idUsuario,
        Codigo: dto.Codigo,
        Nome: dto.Nome,
        CPF_CNPJ: dto.CPF_CNPJ,
        CEP: dto.CEP,
        Logradouro: dto.Logradouro,
        Endereco: dto.Endereco,
        Numero: dto.Numero,
        Bairro: dto.Bairro,
        Cidade: dto.Cidade,
        UF: dto.UF,
        Complemento: dto.Complemento,
        Fone: dto.Fone,
        LimiteCredito: dto.LimiteCredito,
        Validade: new Date(dto.Validade),
      },
    });
  }

  async findAll(filterDto?: FilterClienteDto): Promise<Cliente[]> {
    const { Codigo, Nome, Cidade, CEP } = filterDto || {};

    // Use Prisma.ClienteWhereInput diretamente
    const where: Prisma.ClienteWhereInput = {}; // <--- Tipagem explícita aqui

    if (Codigo) {
      where.Codigo = {
        contains: Codigo,
      };
    }
    if (Nome) {
      where.Nome = {
        contains: Nome,
      };
    }
    if (Cidade) {
      where.Cidade = {
        contains: Cidade,
      };
    }
    if (CEP !== undefined && CEP !== null) {
      where.CEP = CEP;
    }

    return await this.prisma.cliente.findMany({
      where,
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    // Use Prisma.ClienteUpdateInput para tipagem explícita
    const updateData: Prisma.ClienteUncheckedUpdateInput = {}; // <--- Tipagem explícita aqui

    for (const key of Object.keys(dto) as Array<keyof UpdateClienteDto>) {
      const value = dto[key];
      if (value !== undefined) {
        if (key === 'idUsuario') {
          updateData.id = value as number;
        } else if (key === 'Validade') {
          updateData.Validade = new Date(value as string);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (updateData as any)[key] = value;
        }
      }
    }

    try {
      return await this.prisma.cliente.update({
        where: { id: id },
        data: updateData,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<Cliente> {
    try {
      return await this.prisma.cliente.delete({
        where: { id: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
      }
      throw error;
    }
  }
}
