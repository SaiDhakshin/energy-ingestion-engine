import { Controller, Post, Body } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestestionDTO } from './dto/ingestion.dto';

@Controller('v1/ingest')
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post()
  async injest(@Body() dto: IngestestionDTO) {
    return this.ingestionService.ingest(dto);
  }
}
