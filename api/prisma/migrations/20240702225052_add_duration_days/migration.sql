/*
  Warnings:

  - You are about to drop the column `duration_in_days` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `durationDays` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "duration_in_days",
ADD COLUMN     "durationDays" INTEGER NOT NULL;
