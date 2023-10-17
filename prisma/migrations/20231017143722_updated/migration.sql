/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentInfoId` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_booking_id_fkey";

-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "paymentInfoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "news" ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "payment";

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "id" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paypalEmail" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "paypalTransactionId" TEXT,
    "paypalPayerId" TEXT,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_paymentInfoId_fkey" FOREIGN KEY ("paymentInfoId") REFERENCES "PaymentInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
