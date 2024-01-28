import { Global, Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Global()
@Module({
  imports: [
    ApplicationModule, 
    InfrastructureModule,
  ],
})
export class VerificationTokenModule {}
