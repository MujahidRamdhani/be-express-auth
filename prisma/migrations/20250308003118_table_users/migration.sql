-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `fullName` VARCHAR(40) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
