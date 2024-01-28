import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InsertCommand, VerifyCommand } from './commands/impl';

@Injectable()
export class VerificationTokenService {
  constructor(
    private readonly commandBus: CommandBus,
  ) { }

  async verify(token: string) {
    return this.commandBus.execute(new VerifyCommand(token));
  }

  async insert(userId: string) {
    return this.commandBus.execute(new InsertCommand(userId));
  }
}
