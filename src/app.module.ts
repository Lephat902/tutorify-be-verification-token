import { Module } from '@nestjs/common';
import { VerificationTokenModule } from './verification/verification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    VerificationTokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    })
  ],
})
export class AppModule {}
