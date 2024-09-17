import { Account } from '@/models/account.model';
import { injectable } from 'inversify';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@injectable()
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => Account, (account) => account.role)
  accounts!: Account[];
}
