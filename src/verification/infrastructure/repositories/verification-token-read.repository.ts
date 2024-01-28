import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { VerificationToken } from '../verification-token.entity';

@Injectable()
export class VerificationTokenReadRepository extends Repository<VerificationToken> {
    constructor(private dataSource: DataSource) {
        super(VerificationToken, dataSource.createEntityManager());
    }
}
