import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTelemetry } from './entities/vehicle-telemetry.entity';
import { MeterTelemetry } from './entities/meter-telemetry.entity';
import { VehicleCurrentStatus } from './entities/vehicle-current-status.entity';
import { MeterCurrentStatus } from './entities/meter-current-status.entity';
import { FleetAsset } from './entities/fleet-asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleTelemetry,
      MeterTelemetry,
      VehicleCurrentStatus,
      MeterCurrentStatus,
      FleetAsset,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class TelemetryModule {}
