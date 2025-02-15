/*
  Warnings:

  - Added the required column `role` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SupplierRole" AS ENUM ('MANUFACTURER', 'WHOLESALER', 'DISTRIBUTOR');

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "role" "SupplierRole" NOT NULL;
