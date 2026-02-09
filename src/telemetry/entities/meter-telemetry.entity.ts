import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['meterId', 'timestamp'])
// composite index prevents full table scans
export class MeterTelemetry {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  meterId: string;

  @Column('float')
  kwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
