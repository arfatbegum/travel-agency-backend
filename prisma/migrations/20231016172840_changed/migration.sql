/*
  Warnings:

  - A unique constraint covering the columns `[contactNo]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_contactNo_key" ON "user"("contactNo");
