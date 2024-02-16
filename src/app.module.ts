import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VerificationToken } from './verification-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationTokenService } from './verification-token.service';
import { VerificationTokenController } from './verification-token.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationToken]),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        url: configService.get('DATABASE_URI'),
        entities: [VerificationToken],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    })
  ],
  providers: [VerificationTokenService],
  controllers: [VerificationTokenController],
})
export class AppModule {}
