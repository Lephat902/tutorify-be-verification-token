import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { VerifyCommand } from '../impl';
import { VerificationTokenWriteRepository } from 'src/verification/infrastructure/repositories';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(VerifyCommand)
export class VerifyHandler implements ICommandHandler<VerifyCommand> {
    constructor(
        private readonly _repository: VerificationTokenWriteRepository,
    ) { }

    async execute(command: VerifyCommand) {
        const { token } = command;

        // Step 1: Fetch the verification token from the repository
        const verificationToken = await this._repository.findOneBy({ token });

        // Step 2: Verify the validity of the token
        if (verificationToken && verificationToken.expirationDate > new Date()) {
            const userId = verificationToken.userId;

            // Step 3: Remove all tokens belonging to the user
            await this._repository.delete({ userId });

            // Step 4: Return the userId
            return userId;
        } else {
            // Step 4: Throw an error if the token is not valid or has expired
            throw new BadRequestException('Invalid or expired verification token');
        }
    }
}
