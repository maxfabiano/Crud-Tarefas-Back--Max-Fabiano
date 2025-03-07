import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // ✅ Importando a estratégia JWT
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // ✅ Registrando a estratégia
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy], // ✅ Adicionando JwtStrategy
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
