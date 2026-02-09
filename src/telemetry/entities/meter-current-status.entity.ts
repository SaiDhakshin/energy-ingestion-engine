import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class MeterCurrentStatus {
  @PrimaryColumn()
  // primary key enables UPSERT
  meterId: string;

  @Column('float')
  kwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
