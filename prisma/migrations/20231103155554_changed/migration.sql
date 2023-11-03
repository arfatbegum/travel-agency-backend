/*
  Warnings:

  - You are about to drop the column `serviceId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `PaymentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adult` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_categoryId_fkey";

-- AlterTable
ALTER TABLE "PaymentInfo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "serviceId",
ADD COLUMN     "adult" INTEGER NOT NULL,
ADD COLUMN     "childern" INTEGER,
ADD COLUMN     "packageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "review" DROP COLUMN "serviceId",
ADD COLUMN     "packageId" TEXT;

-- DropTable
DROP TABLE "service";

-- CreateTable
CREATE TABLE "package" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_till" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "people" INTEGER NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "facilities" TEXT,
    "why_choose_us" TEXT,
    "image" TEXT NOT NULL,
    "available_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "profileImg" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teamMember_email_key" ON "teamMember"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teamMember_contactNo_key" ON "teamMember"("contactNo");

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
