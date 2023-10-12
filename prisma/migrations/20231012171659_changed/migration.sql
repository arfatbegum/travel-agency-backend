/*
  Warnings:

  - You are about to drop the column `serviceId` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_serviceId_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "serviceId",
ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "service" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
