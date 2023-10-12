/*
  Warnings:

  - Added the required column `available_service_id` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "booking" ADD COLUMN     "available_service_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service" ALTER COLUMN "facilities" DROP NOT NULL,
ALTER COLUMN "whyChooseUs" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TimeSlots" (
    "id" TEXT NOT NULL,
    "slot_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_services" (
    "id" TEXT NOT NULL,
    "slot_date" TIMESTAMP(3) NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "service_id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "available_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "available_services_slot_id_service_id_slot_date_key" ON "available_services"("slot_id", "service_id", "slot_date");

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_available_service_id_fkey" FOREIGN KEY ("available_service_id") REFERENCES "available_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
