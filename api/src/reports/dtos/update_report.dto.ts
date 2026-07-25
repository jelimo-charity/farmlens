import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create_report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}