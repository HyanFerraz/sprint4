import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('cache')
export class CacheEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'bigint' })
  ttl: number;

  @Column({
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
