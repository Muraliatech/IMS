/*
  Warnings:

  - Added the required column `password` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Supplier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `Supplier` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "quantity" INTEGER;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isActive" DROP NOT NULL;
