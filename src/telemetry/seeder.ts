import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FleetAsset } from './entities/fleet-asset.entity';

@Injectable()
export class Seeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(FleetAsset)
    private fleetRepo: Repository<FleetAsset>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.fleetRepo.count();

    // prevents duplicate seeding
    if (count > 0) return;

    await this.fleetRepo.insert([
      { vehicleId: 'vehicle_1', meterId: 'meter_1' },
      { vehicleId: 'vehicle_2', meterId: 'meter_2' },
      { vehicleId: 'vehicle_3', meterId: 'meter_3' },
    ]);

    console.log('Fleet mappings seeded');
  }
}
