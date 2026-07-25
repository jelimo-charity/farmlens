import { Injectable } from '@nestjs/common';
import { db } from '../../database';
import { reports } from '../../database/schema';
import { eq,and, SQL, sql, asc, desc } from 'drizzle-orm';
import { CreateReportDto } from '../dtos/create_report.dto';
import { FilterReportsDto } from '../dtos/filter_reports.dto';
import {
  climateEventEnum,
  cropEnum,
  growthStageEnum,
  plantingMonthEnum,
} from '../../database/schema';
import { UpdateReportDto } from '../dtos/update_report.dto';

@Injectable()
export class ReportsRepository {
  async create(createReportDto: CreateReportDto) {
    const [report] = await db
      .insert(reports)
      .values({
        ...createReportDto,
        reportDate: new Date(createReportDto.reportDate),
      })
      .returning();

    return report;
  }

  async findAll() {
    return db.select().from(reports);
  }

  async findById(id: string) {
    const [report] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, id));

    return report;
  }
async filter(filters: FilterReportsDto) {
  const conditions: SQL[] = [];

  if (filters.county) {
    conditions.push(eq(reports.county, filters.county));
  }

  if (filters.subCounty) {
    conditions.push(eq(reports.subCounty, filters.subCounty));
  }

  if (filters.crop) {
    conditions.push(eq(reports.crop, filters.crop as any));
  }

  if (filters.climateEvent) {
    conditions.push(
      eq(reports.climateEvent, filters.climateEvent as any),
    );
  }

  if (filters.growthStage) {
    conditions.push(
      eq(reports.growthStage, filters.growthStage as any),
    );
  }

  let query = db.select().from(reports);

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  if (filters.sortBy) {
    const sortColumns = {
      reportDate: reports.reportDate,
      estimatedLossPercentage: reports.estimatedLossPercentage,
      farmSizeAcres: reports.farmSizeAcres,
      county: reports.county,
    };

    const column = sortColumns[filters.sortBy];

    if (column) {
      query = query.orderBy(
        filters.order === 'asc'
          ? asc(column)
          : desc(column),
      ) as typeof query;
    }
  }

  return query;
}

async getDashboardStats() {
  const [stats] = await db
    .select({
      totalReports: sql<number>`count(*)`,
      affectedCounties: sql<number>`count(distinct county)`,
      averageLossPercentage:
        sql<number>`round(avg(estimated_loss_percentage), 1)`,
      totalFarmSizeAcres:
        sql<number>`round(sum(farm_size_acres), 1)`,
    })
    .from(reports);

  const [topCrop] = await db
    .select({
      crop: reports.crop,
      total: sql<number>`count(*)`,
    })
    .from(reports)
    .groupBy(reports.crop)
    .orderBy(sql`count(*) desc`)
    .limit(1);

  const [topClimateEvent] = await db
    .select({
      climateEvent: reports.climateEvent,
      total: sql<number>`count(*)`,
    })
    .from(reports)
    .groupBy(reports.climateEvent)
    .orderBy(sql`count(*) desc`)
    .limit(1);

  return {
    totalReports: Number(stats.totalReports),
    affectedCounties: Number(stats.affectedCounties),
    averageLossPercentage:
      Number(stats.averageLossPercentage) || 0,
    totalFarmSizeAcres:
      Number(stats.totalFarmSizeAcres) || 0,
    mostAffectedCrop: topCrop?.crop ?? null,
    mostReportedClimateEvent:
      topClimateEvent?.climateEvent ?? null,
  };
}
// map reports for visualization on a map
async getMapReports() {
  return db
    .select({
      id: reports.id,
      latitude: reports.latitude,
      longitude: reports.longitude,
      county: reports.county,
      subCounty: reports.subCounty,
      crop: reports.crop,
      climateEvent: reports.climateEvent,
      estimatedLossPercentage: reports.estimatedLossPercentage,
    })
    .from(reports);
}

async getMetadata() {
  const currentYear = new Date().getFullYear();

  const plantingYears: number[] = [];

  for (let year = currentYear; year >= 2024; year--) {
    plantingYears.push(year);
  }

  return {
    crops: cropEnum.enumValues,
    growthStages: growthStageEnum.enumValues,
    climateEvents: climateEventEnum.enumValues,
    plantingMonths: plantingMonthEnum.enumValues,
    plantingYears,
  };
}

async update(
  id: string,
  dto: UpdateReportDto,
) {
  const updateData: any = {
    ...dto,
  };

  if (dto.reportDate) {
    updateData.reportDate = new Date(dto.reportDate);
  }

  const [report] = await db
    .update(reports)
    .set(updateData)
    .where(eq(reports.id, id))
    .returning();

  return report;
}

async delete(id: string) {
  const [report] = await db
    .delete(reports)
    .where(eq(reports.id, id))
    .returning();

  return report;
}

}