/*
  Warnings:

  - You are about to drop the column `status` on the `booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booking" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_status" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_booking_id_key" ON "payment"("booking_id");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
