/*
  Warnings:

  - The values [PENDING,REQUESTED,APPROVED,ORDERED,ONPROGRESS] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('INVOICE', 'PACKING_LIST', 'QUALITY_CERTIFICATE', 'SHIPPING_DOCUMENT', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('STOCK_LOW', 'REORDER_REQUESTED', 'PRICE_PROPOSED', 'PRICE_NEGOTIATING', 'PRICE_APPROVED', 'IN_PRODUCTION', 'QC_PENDING', 'QC_APPROVED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED', 'REJECTED', 'CANCELLED');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
-- ALTER TABLE "OrderStatusHistory" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "actualDeliveryDate" TIMESTAMP(3),
ADD COLUMN     "expectedDeliveryDate" TIMESTAMP(3),
ADD COLUMN     "orderNotes" TEXT,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "shippingDetails" TEXT,
ADD COLUMN     "trackingNumber" TEXT;

-- CreateTable
CREATE TABLE "OrderDocument" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderQualityCheck" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "checkDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkedBy" TEXT NOT NULL,
    "status" "QCStatus" NOT NULL,
    "comments" TEXT,
    "parameters" JSONB NOT NULL,

    CONSTRAINT "OrderQualityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
-- CREATE TABLE "OrderStatusHistory" (
--     "id" TEXT NOT NULL,
--     "orderId" TEXT NOT NULL,
--     "status" "OrderStatus" NOT NULL,
--     "changedBy" TEXT NOT NULL,
--     "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     "comments" TEXT,

--     CONSTRAINT "OrderStatusHistory_pkey" PRIMARY KEY ("id")
-- );

-- AddForeignKey
ALTER TABLE "OrderDocument" ADD CONSTRAINT "OrderDocument_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderQualityCheck" ADD CONSTRAINT "OrderQualityCheck_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- ALTER TABLE "OrderStatusHistory" ADD CONSTRAINT "OrderStatusHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

