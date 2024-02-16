import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class VerificationToken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    token: string;

    @Column({ nullable: false })
    expirationDate: Date;

    @Column({ nullable: false })
    userId: string;
}