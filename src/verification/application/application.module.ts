import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { VerificationTokenService } from './user.service';
import { VerificationTokenController } from './user.controller';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
    CqrsModule,
  ],
  controllers: [VerificationTokenController],
  providers: [...CommandHandlers, VerificationTokenService],
})
export class ApplicationModule { }