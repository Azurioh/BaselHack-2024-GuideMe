-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guideLines" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgs" TEXT[],
    "keywords" TEXT[],
    "result" TEXT NOT NULL,
    "creatorId" INTEGER,

    CONSTRAINT "guideLines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "guideLines" ADD CONSTRAINT "guideLines_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
