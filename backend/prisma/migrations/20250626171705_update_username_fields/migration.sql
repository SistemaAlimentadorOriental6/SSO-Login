/*
  Warnings:

  - You are about to drop the column `cedula` on the `LoginAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `cedula` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `LoginAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `LoginAttempt_cedula_idx` ON `LoginAttempt`;

-- DropIndex
DROP INDEX `User_cedula_idx` ON `User`;

-- DropIndex
DROP INDEX `User_cedula_key` ON `User`;

-- AlterTable
ALTER TABLE `LoginAttempt` DROP COLUMN `cedula`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `cedula`,
    ADD COLUMN `externalId` INTEGER NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `LoginAttempt_username_idx` ON `LoginAttempt`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `User_username_idx` ON `User`(`username`);

-- CreateIndex
CREATE INDEX `User_externalId_idx` ON `User`(`externalId`);
