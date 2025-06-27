-- AlterTable
ALTER TABLE `LoginAttempt` MODIFY `userAgent` TEXT NULL,
    MODIFY `reason` TEXT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `token` VARCHAR(1000) NOT NULL,
    MODIFY `userAgent` TEXT NULL;
