/*
  Warnings:

  - Added the required column `duration_in_days` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "duration_in_days" INTEGER NOT NULL;
