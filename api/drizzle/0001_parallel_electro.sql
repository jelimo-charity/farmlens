ALTER TABLE "reports" ALTER COLUMN "farm_size_acres" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "reports" ALTER COLUMN "estimated_loss_percentage" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "estimated_financial_loss" real;