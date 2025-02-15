/*
  Warnings:

  - Added the required column `reorderQuantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "reorderQuantity" INTEGER NOT NULL;
