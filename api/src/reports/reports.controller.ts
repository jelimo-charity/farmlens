import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateReportDto } from './dtos/create_report.dto';
import { FilterReportsDto } from './dtos/filter_reports.dto';
import { ReportsService } from './reports.service';
import { Query} from '@nestjs/common';
import { UpdateReportDto } from './dtos/update_report.dto';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}
@Post()
create(@Body() dto: CreateReportDto) {
  return this.reportsService.create(dto);
}

@Get()
findAll(@Query() filters: FilterReportsDto) {
  return this.reportsService.filter(filters);
}

@Get('dashboard')
@ApiOperation({ summary: 'Get dashboard statistics' })
getDashboardStats() {
  return this.reportsService.getDashboardStats();
}

@Get("map")
@ApiOperation({
  summary: "Get reports for map visualization",
})
getMapReports() {
  return this.reportsService.getMapReports();
}

@Get('metadata')
@ApiOperation({
  summary: 'Get application metadata',
})
getMetadata() {
  return this.reportsService.getMetadata();
}


@Get(':id')
@ApiOperation({ summary: 'Get report by ID' })
findById(@Param('id') id: string) {
  return this.reportsService.findById(id);
}

@Patch(':id')
@ApiOperation({
  summary: 'Update a report',
})
update(
  @Param('id') id: string,
  @Body() dto: UpdateReportDto,
) {
  return this.reportsService.update(id, dto);
}

@Delete(':id')
@ApiOperation({
  summary: 'Delete a report',
})
delete(@Param('id') id: string) {
  return this.reportsService.delete(id);
}
}