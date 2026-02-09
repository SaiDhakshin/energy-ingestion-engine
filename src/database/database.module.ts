import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeder } from '../telemetry/seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'localhost',
      host: process.env.DB_HOST,
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'energy',
      autoLoadEntities: true,
      synchronize: true, //false in production
      extra: {
        max: 40,
      },
    }),
  ],
})
export class DatabaseModule {}
