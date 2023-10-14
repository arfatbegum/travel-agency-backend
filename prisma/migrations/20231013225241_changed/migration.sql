/*
  Warnings:

  - Added the required column `status` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
