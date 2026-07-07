-- AlterTable
ALTER TABLE "admin_users" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verify_token" TEXT,
ADD COLUMN     "verify_token_expiry" TIMESTAMP(3);
