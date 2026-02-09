import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class VehicleCurrentStatus {
  @PrimaryColumn()
  // primary key enables UPSERT
  vehicleId: string;

  @Column('float')
  soc: number;

  @Column('float')
  lastKwhDelivered: number;

  @Column('float')
  batteryTemp: number;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
