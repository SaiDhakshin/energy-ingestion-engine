import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FleetAsset {
  @PrimaryColumn()
  vehicleId: string;

  @Column({ unique: true })
  meterId: string;
}
