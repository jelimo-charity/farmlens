import { Injectable } from '@nestjs/common';

import { CreateReportDto } from './dtos/create_report.dto';
import { ReportsRepository } from './repository/reports.repository';
import { FilterReportsDto } from './dtos/filter_reports.dto';
import { UpdateReportDto } from './dtos/update_report.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
  ) {}

  async create(createReportDto: CreateReportDto) {
    return this.reportsRepository.create(createReportDto);
  }

  async findAll() {
    return this.reportsRepository.findAll();
  }

  async findById(id: string) {
    return this.reportsRepository.findById(id);
  }

  async filter(filters: FilterReportsDto) {
    return this.reportsRepository.filter(filters);
  }

  async getDashboardStats() {
  return this.reportsRepository.getDashboardStats();
}
  async getMapReports() {
  return this.reportsRepository.getMapReports();
}

async getMetadata() {
  return this.reportsRepository.getMetadata();
}

async update(
  id: string,
  dto: UpdateReportDto,
) {
  return this.reportsRepository.update(id, dto);
}

async delete(id: string) {
  return this.reportsRepository.delete(id);
}
}