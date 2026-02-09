import { IsString, IsNumber, IsIn } from 'class-validator';

export class IngestestionDTO {
  @IsIn(['vehicle', 'meter'])
  type: 'vehicle' | 'meter';

  @IsString()
  id: string; //vehicleId or meterId

  @IsNumber()
  value1: number;

  @IsNumber()
  value2: number;

  @IsNumber()
  timestamp: number;
}
