-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_paymentInfoId_fkey";

-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "paymentInfoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_paymentInfoId_fkey" FOREIGN KEY ("paymentInfoId") REFERENCES "PaymentInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
