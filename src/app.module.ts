import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { TelemetryModule } from './telemetry/telemetry.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [DatabaseModule, AnalyticsModule, TelemetryModule, IngestionModule],
})
export class AppModule {}
