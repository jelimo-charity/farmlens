import { z } from "zod";

export const reportFormSchema = z.object({
  // Step 1 — Farm Location
  county: z.string().min(1, "County is required"),
  subCounty: z.string().min(1, "Sub-county is required"),
  ward: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),

  // Step 2 — Farm Details
  crop: z.string().min(1, "Crop is required"),
  farmSizeAcres: z.number({ message: "Farm size is required" }).positive("Must be greater than 0"),
  plantingMonth: z.string().min(1, "Planting month is required"),
  plantingYear: z
    .number({ message: "Planting year is required" })
    .int()
    .min(2000, "Enter a valid year")
    .max(new Date().getFullYear() + 1, "Enter a valid year"),
  growthStage: z.string().min(1, "Growth stage is required"),

  // Step 3 — Climate Impact
  climateEvent: z.string().min(1, "Climate event is required"),
  estimatedLossPercentage: z
    .number({ message: "Estimated loss is required" })
    .min(0, "Must be between 0 and 100")
    .max(100, "Must be between 0 and 100"),
  description: z.string().max(1000, "Keep it under 1000 characters").optional(),
  imageUrl: z.union([z.string().url("Must be a valid URL"), z.literal("")]).optional(),
});

export type ReportFormValues = z.infer<typeof reportFormSchema>;

export const REPORT_FORM_STEPS = [
  { label: "Farm Info", key: "location" },
  { label: "Farm Details", key: "details" },
  { label: "Climate Event", key: "impact" },
  { label: "Review", key: "review" },
] as const;

export const STEP_FIELDS: Record<number, (keyof ReportFormValues)[]> = {
  0: ["county", "subCounty", "ward", "latitude", "longitude"],
  1: ["crop", "farmSizeAcres", "plantingMonth", "plantingYear", "growthStage"],
  2: ["climateEvent", "estimatedLossPercentage", "description", "imageUrl"],
  3: [],
};

export const REPORT_FORM_DEFAULTS: Partial<ReportFormValues> = {
  plantingYear: new Date().getFullYear(),
  estimatedLossPercentage: 0,
};