/*
  Warnings:

  - Made the column `paymentInfoId` on table `booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_paymentInfoId_fkey";

-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "paymentInfoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "profileImg" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_paymentInfoId_fkey" FOREIGN KEY ("paymentInfoId") REFERENCES "PaymentInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
