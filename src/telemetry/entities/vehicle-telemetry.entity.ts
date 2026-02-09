import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['vehicleId', 'timestamp'])
// composite index prevents full table scans
export class VehicleTelemetry {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  vehicleId: string;

  @Column('float')
  kwhDeliveredDc: number;

  @Column('float')
  batteryTemp: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
