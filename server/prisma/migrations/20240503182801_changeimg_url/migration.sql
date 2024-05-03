/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `ColorVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ColorVariant" DROP COLUMN "imgUrl";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imgUrl" TEXT;
