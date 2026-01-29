-- AlterTable
ALTER TABLE `appointment` MODIFY `notes` TEXT NULL;

-- AlterTable
ALTER TABLE `donation` MODIFY `message` TEXT NULL;

-- AlterTable
ALTER TABLE `medicine` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `notification` MODIFY `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `patientprofile` MODIFY `allergies` TEXT NULL,
    MODIFY `medicalHistory` TEXT NULL;

-- AlterTable
ALTER TABLE `pharmacyprofile` MODIFY `openingHours` TEXT NULL;

-- AlterTable
ALTER TABLE `prescription` MODIFY `medications` TEXT NOT NULL,
    MODIFY `diagnosis` TEXT NULL,
    MODIFY `notes` TEXT NULL;

-- AlterTable
ALTER TABLE `professionalprofile` MODIFY `bio` TEXT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `comment` TEXT NULL;

-- RedefineIndex
CREATE INDEX `Donation_userId_idx` ON `Donation`(`userId`);
DROP INDEX `Donation_userId_fkey` ON `donation`;
