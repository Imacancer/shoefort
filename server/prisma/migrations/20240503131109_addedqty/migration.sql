/*
  Warnings:

  - Added the required column `qty` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ColorVariant" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "qty" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;
