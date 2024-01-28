import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationTokenReadRepository, VerificationTokenWriteRepository } from './repositories';
import { VerificationToken } from './verification-token.entity';
import { ConfigService } from '@nestjs/config';

@Global()
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
  ],
  providers: [
    VerificationTokenReadRepository,
    VerificationTokenWriteRepository,
  ],
  exports: [
    VerificationTokenReadRepository,
    VerificationTokenWriteRepository,
  ]
})
export class InfrastructureModule {}
