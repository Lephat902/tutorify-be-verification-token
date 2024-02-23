import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VerificationTokenService } from './verification-token.service';

@Controller()
export class VerificationTokenController {
  constructor(private readonly verificationTokenService: VerificationTokenService) { }

  @MessagePattern({ cmd: 'verify' })
  verify(token: string) {
    return this.verificationTokenService.verify(token);
  }

  @MessagePattern({ cmd: 'insert' })
  insert(userId: string) {
    return this.verificationTokenService.insert(userId);
  }

  @MessagePattern({ cmd: 'deleteAll' })
  deleteAll(userId: string) {
    return this.verificationTokenService.deleteAll(userId);
  }
}
