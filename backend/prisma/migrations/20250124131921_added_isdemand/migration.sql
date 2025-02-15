-- CreateEnum
CREATE TYPE "DemandType" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "demandForecast" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "lastDemandUpdate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isDemand" "DemandType" DEFAULT 'MEDIUM';
