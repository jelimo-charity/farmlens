CREATE TYPE "public"."climate_event" AS ENUM('Delayed Rains', 'Drought', 'Flood', 'Hailstorm', 'Strong Winds', 'Extreme Heat', 'Frost', 'Landslide', 'Pest Outbreak', 'Disease Outbreak', 'Other');--> statement-breakpoint
CREATE TYPE "public"."crop" AS ENUM('Maize', 'Beans', 'Coffee', 'Tea', 'Potatoes', 'Rice', 'Wheat', 'Sorghum', 'Millet', 'Bananas', 'Tomatoes', 'Other');--> statement-breakpoint
CREATE TYPE "public"."growth_stage" AS ENUM('Recently Planted', 'Early Growth', 'Growing', 'Flowering', 'Almost Ready', 'Ready for Harvest');--> statement-breakpoint
CREATE TYPE "public"."planting_month" AS ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"county" varchar(100) NOT NULL,
	"sub_county" varchar(100) NOT NULL,
	"ward" varchar(100),
	"latitude" double precision,
	"longitude" double precision,
	"crop" "crop" NOT NULL,
	"farm_size_acres" numeric(10, 2) NOT NULL,
	"planting_month" "planting_month" NOT NULL,
	"planting_year" integer NOT NULL,
	"growth_stage" "growth_stage" NOT NULL,
	"climate_event" "climate_event" NOT NULL,
	"report_date" timestamp NOT NULL,
	"estimated_loss_percentage" numeric(5, 2) NOT NULL,
	"description" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
