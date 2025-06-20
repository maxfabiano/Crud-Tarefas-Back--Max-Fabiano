// src/auth/auth.service.ts

import {
  UnauthorizedException,
  Injectable,
  ConflictException,
} from '@nestjs/common'; // Removido ForbiddenException
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto, LoginResponseDto } from './dto/auth.dto';
import { Role } from '@prisma/client'; // Importe Role

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<{ message: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já registrado.');
    }

    if (!dto.password) {
      throw new ConflictException('A senha é obrigatória para o registro.');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // REGRA DE NEGÓCIO: Usuários cadastrados pela tela inicial SÃO SEMPRE ADMIN
    await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: Role.ADMIN, // <<< FIX: A role é FORÇADA para ADMIN aqui
      },
    });

    return { message: 'Usuário registrado com sucesso.' };
  }

  // O método login permanece o mesmo
  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password || '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}