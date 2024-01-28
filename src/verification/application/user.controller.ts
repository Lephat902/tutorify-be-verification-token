import { ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { VerificationTokenService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class VerificationTokenController {
  constructor(private readonly tokenService: VerificationTokenService) { }

  @MessagePattern({ cmd: 'verify' })
  verify(token: string) {
    return this.tokenService.verify(token);
  }

  @MessagePattern({ cmd: 'insert' })
  insert(userId: string) {
    return this.tokenService.insert(userId);
  }
}
