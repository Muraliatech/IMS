/*
  Warnings:

  - You are about to drop the column `actualDeliveryDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `expectedDeliveryDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderNotes` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `rejectionReason` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingDetails` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `trackingNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `OrderDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderQualityCheck` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderStatus_new" AS ENUM ('STOCK_LOW', 'REORDER_REQUESTED', 'PRICE_PROPOSED', 'PRICE_NEGOTIATING', 'PRICE_APPROVED', 'IN_PRODUCTION', 'QC_PENDING', 'QC_APPROVED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED', 'REJECTED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "OrderDocument" DROP CONSTRAINT "OrderDocument_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderQualityCheck" DROP CONSTRAINT "OrderQualityCheck_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "actualDeliveryDate",
DROP COLUMN "expectedDeliveryDate",
DROP COLUMN "orderNotes",
DROP COLUMN "rejectionReason",
DROP COLUMN "shippingDetails",
DROP COLUMN "trackingNumber",
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus_new" NOT NULL;

-- DropTable
DROP TABLE "OrderDocument";

-- DropTable
DROP TABLE "OrderQualityCheck";

-- DropEnum
DROP TYPE "OrderStatus";
