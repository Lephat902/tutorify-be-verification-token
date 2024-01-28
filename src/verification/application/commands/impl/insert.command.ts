import { ICommand } from '@nestjs/cqrs';

export class InsertCommand implements ICommand {
    constructor(public readonly userId: string) { }
}