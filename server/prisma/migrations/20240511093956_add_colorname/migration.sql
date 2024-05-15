/*
  Warnings:

  - Added the required column `name` to the `ColorVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ColorVariant" ADD COLUMN     "name" TEXT NOT NULL;
