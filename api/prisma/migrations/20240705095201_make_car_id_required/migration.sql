/*
  Warnings:

  - Made the column `carId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "carId" SET NOT NULL;
