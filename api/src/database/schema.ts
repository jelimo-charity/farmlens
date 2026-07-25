import { real } from "drizzle-orm/pg-core";
import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  decimal,
  timestamp,
  text,
  doublePrecision,
  integer,
} from "drizzle-orm/pg-core";

/**
 * Crop Growth Stage
 */
export const growthStageEnum = pgEnum("growth_stage", [
  "Recently Planted",
  "Early Growth",
  "Growing",
  "Flowering",
  "Almost Ready",
  "Ready for Harvest",
]);

/**
 * Planting Month
 */
export const plantingMonthEnum = pgEnum("planting_month", [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

/**
 * Climate Events
 */
export const climateEventEnum = pgEnum("climate_event", [
  "Delayed Rains",
  "Drought",
  "Flood",
  "Hailstorm",
  "Strong Winds",
  "Extreme Heat",
  "Frost",
  "Landslide",
  "Pest Outbreak",
  "Disease Outbreak",
  "Other",
]);

/**
 * Common Crops
 */
export const cropEnum = pgEnum("crop", [
  "Maize",
  "Beans",
  "Coffee",
  "Tea",
  "Potatoes",
  "Rice",
  "Wheat",
  "Sorghum",
  "Millet",
  "Bananas",
  "Tomatoes",
  "Other",
]);

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Farm Location
  county: varchar("county", { length: 100 }).notNull(),
  subCounty: varchar("sub_county", { length: 100 }).notNull(),
  ward: varchar("ward", { length: 100 }),

  latitude: doublePrecision("latitude"),
  longitude: doublePrecision("longitude"),

  // Farm Details
  crop: cropEnum("crop").notNull(),

  farmSizeAcres: real("farm_size_acres").notNull(),

  plantingMonth: plantingMonthEnum("planting_month").notNull(),

  plantingYear: integer("planting_year").notNull(),

  growthStage: growthStageEnum("growth_stage").notNull(),

  // Climate Impact
  climateEvent: climateEventEnum("climate_event").notNull(),

  reportDate: timestamp("report_date").notNull(),

  estimatedLossPercentage: real("estimated_loss_percentage").notNull(),

  description: text("description"),

  // Optional Evidence
  imageUrl: text("image_url"),

  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});