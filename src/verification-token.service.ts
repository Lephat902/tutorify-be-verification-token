import { BadRequestException, Injectable } from '@nestjs/common';
import { VerificationToken } from './verification-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class VerificationTokenService {
  constructor(
    @InjectRepository(VerificationToken)
    private readonly verificationTokenRepository: Repository<VerificationToken>,
    private readonly configService: ConfigService,
  ) { }

  async verify(token: string) {
    // Step 1: Fetch the verification token from the repository
    const verificationToken = await this.verificationTokenRepository.findOneBy({ token });

    // Step 2: Verify the validity of the token
    if (verificationToken && verificationToken.expirationDate > new Date()) {
      const userId = verificationToken.userId;

      // Step 3: Remove all tokens belonging to the user
      this.deleteAll(userId);

      // Step 4: Return the userId
      return userId;
    } else {
      // Step 4: Throw an error if the token is not valid or has expired
      throw new BadRequestException('Invalid or expired verification token');
    }
  }

  async insert(userId: string) {
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
    await this.verificationTokenRepository.save(verificationToken);

    return randomToken;
  }

  async deleteAll(userId: string) {
    await this.verificationTokenRepository.delete({ userId });
    return true;
  }
}
