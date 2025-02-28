/*
  Warnings:

  - You are about to drop the column `isDemand` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isDemand",
ADD COLUMN     "imageUrls" TEXT[];
