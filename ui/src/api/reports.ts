import { api } from "./client";
import type {
  CreateReportDto,
  DashboardStats,
  FilterReportsDto,
  MapReport,
  Report,
  ReportMetadata,
} from "@/types/report";

export const ReportsApi = {
  getAll: () => api.get<Report[]>("/reports"),

  getDashboard: () => api.get<DashboardStats>("/reports/dashboard"),

  getMap: () => api.get<MapReport[]>("/reports/map"),

  getMetadata: () => api.get<ReportMetadata>("/reports/metadata"),

  filter: (params: FilterReportsDto) => api.get<Report[]>("/reports/filter", { params }),

  create: (data: CreateReportDto) => api.post<Report>("/reports", data),
};