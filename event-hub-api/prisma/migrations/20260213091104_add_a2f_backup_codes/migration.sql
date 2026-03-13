-- CreateTable
CREATE TABLE "A2FBackupCodes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "codes_hash" TEXT[],
    "nb_code_used" INTEGER NOT NULL,
    "nb_consecutive_tests" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "A2FBackupCodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "A2FBackupCodes_user_id_key" ON "A2FBackupCodes"("user_id");
