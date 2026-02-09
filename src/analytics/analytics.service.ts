import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleTelemetry } from 'src/telemetry/entities/vehicle-telemetry.entity';
import { MeterTelemetry } from 'src/telemetry/entities/meter-telemetry.entity';
import { FleetAsset } from 'src/telemetry/entities/fleet-asset.entity';

type VehiclePerformance = {
  totalDc: string | null;
  avgTemp: string | null;
};

type MeterPerformance = {
  totalAc: string | null;
};

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(VehicleTelemetry)
    private vehicleRepo: Repository<VehicleTelemetry>,

    @InjectRepository(MeterTelemetry)
    private meterRepo: Repository<MeterTelemetry>,

    @InjectRepository(FleetAsset)
    private fleetRepo: Repository<FleetAsset>,
  ) {}

  async getPerformance(vehicleId: string) {
    const since = new Date();
    since.setHours(since.getHours() - 24);

    const meterId = await this.fleetRepo.findOne({
      where: { vehicleId },
    });

    if (!meterId) {
      throw new Error('Mapping not found');
    }

    const vehicleStats = await this.vehicleRepo
      .createQueryBuilder('v')
      .select('SUM(v.kwhDeliveredDc)', 'totalDc')
      .addSelect('AVG(v.batteryTemp)', 'avgTemp')
      .where('v.vehicleId = :vehicleId', { vehicleId })
      .andWhere('v.timestamp >= :since', { since })
      .getRawOne<VehiclePerformance>();

    const meterStats = await this.meterRepo
      .createQueryBuilder('m')
      .select('SUM(m.kwhConsumedAc)', 'totalAc')
      .where('m.meterId = :meterId', { meterId: meterId.meterId })
      .andWhere('m.timestamp >= :since', { since: since })
      .getRawOne<MeterPerformance>();

    const totalDc = Number(vehicleStats?.totalDc ?? 0);
    const totalAc = Number(meterStats?.totalAc ?? 0);

    const efficiency = totalAc > 0 ? totalDc / totalAc : 0;

    return {
      totalAc: meterStats?.totalAc,
      totalDc: vehicleStats?.totalDc,
      efficiency,
      avgBatteryTemp: vehicleStats?.avgTemp,
    };
  }
}
