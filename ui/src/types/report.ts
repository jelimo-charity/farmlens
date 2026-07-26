export interface Report {
  id: string;
  county: string;
  subCounty: string;
  ward: string;
  latitude: number;
  longitude: number;
  crop: string;
  farmSizeAcres: number;
  plantingMonth: string;
  plantingYear: number;
  growthStage: string;
  climateEvent: string;
  reportDate: string;
  estimatedLossPercentage: number;
  estimatedFinancialLoss: number;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReportMetadata {
  counties: string[];
  crops: string[];
  plantingMonths: string[];
  growthStages: string[];
  climateEvents: string[];
}

/** Shape sent to POST /reports. Matches the reports table minus generated/server fields. */
export interface CreateReportDto {
  county: string;
  subCounty: string;
  ward?: string;
  latitude?: number;
  longitude?: number;
  crop: string;
  farmSizeAcres: number;
  plantingMonth: string;
  plantingYear: number;
  growthStage: string;
  climateEvent: string;
  reportDate: string;
  estimatedLossPercentage: number;
  estimatedFinancialLoss: number;
  description?: string;
  imageUrl?: string;
}

/** Query params sent to GET /reports/filter (or /reports?...). Matches backend's FilterReportsDto. */
export interface FilterReportsDto {
  county?: string;
  subCounty?: string;
  crop?: string;
  climateEvent?: string;
  growthStage?: string;
}

/** Shape returned by GET /reports/map — a lighter projection of Report for plotting. */
export interface MapReport {
  id: string;
  latitude: number;
  longitude: number;
  county: string;
  subCounty: string;
  crop: string;
  climateEvent: string;
  estimatedLossPercentage: number;
  estimatedFinancialLoss: number;
}

export interface DashboardStats {
  totalReports: number;
  affectedCounties: number;
  averageLossPercentage: number;
  totalFarmSizeAcres: number;
  mostAffectedCrop: string | null;
  mostReportedClimateEvent: string | null;
  estimatedFinancialLoss: number;
}