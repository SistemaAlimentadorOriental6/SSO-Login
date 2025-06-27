-- DropIndex
DROP INDEX `Session_token_idx` ON `Session`;

-- CreateIndex
CREATE INDEX `Session_token_idx` ON `Session`(`token`);
