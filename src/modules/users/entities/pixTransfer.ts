import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity('pixTransferense')
export class PixTransfer {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sender_id' })
    user: User;

    @Column()
    sender_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'destiny' })

    @Column()
    destiny: string;

    @Column('decimal', { precision: 5, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

}