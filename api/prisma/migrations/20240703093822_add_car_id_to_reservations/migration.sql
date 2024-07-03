/*
  Warnings:

  - Added the required column `carId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- Add the carId column with a default value temporarily
ALTER TABLE "Reservation" ADD COLUMN "carId" INTEGER DEFAULT 1;

-- Update the existing rows to have a valid carId
UPDATE "Reservation" SET "carId" = 1 WHERE "carId" IS NULL;

-- Modify the column to remove the default value and make it NOT NULL
ALTER TABLE "Reservation" ALTER COLUMN "carId" SET NOT NULL;
ALTER TABLE "Reservation" ALTER COLUMN "carId" DROP DEFAULT;
