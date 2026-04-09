-- CreateTable
CREATE TABLE "users" (
    "usr_id" SERIAL NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_first_name" TEXT NOT NULL,
    "usr_last_name" TEXT NOT NULL,
    "usr_password" TEXT NOT NULL,
    "usr_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("usr_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_usr_email_key" ON "users"("usr_email");
