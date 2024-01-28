import { ICommand } from '@nestjs/cqrs';

export class VerifyCommand implements ICommand {
    constructor(public readonly token: string) { }
}