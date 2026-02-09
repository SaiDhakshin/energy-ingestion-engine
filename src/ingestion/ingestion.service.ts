import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleTelemetry } from 'src/telemetry/entities/vehicle-telemetry.entity';
import { VehicleCurrentStatus } from 'src/telemetry/entities/vehicle-current-status.entity';
import { MeterTelemetry } from 'src/telemetry/entities/meter-telemetry.entity';
import { MeterCurrentStatus } from 'src/telemetry/entities/meter-current-status.entity';
import { IngestestionDTO } from './dto/ingestion.dto';

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(VehicleTelemetry)
    private vehicleRepo: Repository<VehicleTelemetry>,

    @InjectRepository(VehicleCurrentStatus)
    private vehicleCurrentRepo: Repository<VehicleCurrentStatus>,

    @InjectRepository(MeterTelemetry)
    private meterRepo: Repository<MeterTelemetry>,

    @InjectRepository(MeterCurrentStatus)
    private meterCurrentRepo: Repository<MeterCurrentStatus>,
  ) {}

  async ingest(dto: IngestestionDTO) {
    if (dto.type === 'vehicle') {
      // INSERT history
      await this.vehicleRepo.insert({
        vehicleId: dto.id,
        kwhDeliveredDc: dto.value1,
        batteryTemp: dto.value2,
        timestamp: new Date(dto.timestamp),
      });

      // UPSERT live
      await this.vehicleCurrentRepo.upsert(
        {
          vehicleId: dto.id,
          soc: 80, // mock
          lastKwhDelivered: dto.value1,
          batteryTemp: dto.value2,
          updatedAt: new Date(),
        },
        ['vehicleId'],
      );
    }
    if (dto.type === 'meter') {
      // INSERT history
      await this.meterRepo.insert({
        meterId: dto.id,
        kwhConsumedAc: dto.value1,
        voltage: dto.value2,
        timestamp: new Date(dto.timestamp),
      });

      // UPSERT live
      await this.meterCurrentRepo.upsert(
        {
          meterId: dto.id,
          kwhConsumedAc: dto.value1,
          voltage: dto.value2,
          updatedAt: new Date(),
        },
        ['meterId'],
      );
    }
  }
}
