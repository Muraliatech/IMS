/*
  Warnings:

  - Changed the type of `status` on the `QualityControl` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QCStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "QualityControl" DROP COLUMN "status",
ADD COLUMN     "status" "QCStatus" NOT NULL;
