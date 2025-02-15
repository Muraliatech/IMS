/*
  Warnings:

  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderType" ADD VALUE 'SYSTEM';

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "dailyAvgSales" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lastRestockDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "maxCapacity" INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN     "safetyStock" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "price",
ADD COLUMN     "approvedPrice" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "negotiationStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "proposedPrice" DOUBLE PRECISION,
ADD COLUMN     "requestedPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isPerishable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seasonality" TEXT,
ADD COLUMN     "shelfLife" INTEGER;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "leadTime" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "reliability" DOUBLE PRECISION NOT NULL DEFAULT 0;
