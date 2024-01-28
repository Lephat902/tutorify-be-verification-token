import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InsertCommand } from '../impl';
import { VerificationTokenWriteRepository } from 'src/verification/infrastructure/repositories';
import { ConfigService } from '@nestjs/config';
import { VerificationToken } from 'src/verification/infrastructure/verification-token.entity';
import * as crypto from 'crypto';

@CommandHandler(InsertCommand)
export class InsertHandler implements ICommandHandler<InsertCommand> {
    constructor(
        private readonly _repository: VerificationTokenWriteRepository,
        private readonly configService: ConfigService,
    ) { }

    async execute(command: InsertCommand) {
        const { userId } = command;

        // Fetch expiration duration from environment variable
        const expirationDurationInMinutes = this.configService.get<number>('TOKEN_EXPIRY_DURATION') || 60;

        // Generate a random token
        const randomToken = crypto.randomBytes(32).toString('hex');

        // Calculate expiration date
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + expirationDurationInMinutes);

        // Create a new VerificationToken instance
        const verificationToken = new VerificationToken();
        verificationToken.userId = userId;
        verificationToken.token = randomToken;
        verificationToken.expirationDate = expirationDate;

        // Save the new token to the database
        await this._repository.save(verificationToken);

        return randomToken;
    }
}
