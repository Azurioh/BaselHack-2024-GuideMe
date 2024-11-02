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
    "likes" INTEGER NOT NULL,
    "creatorId" INTEGER,

    CONSTRAINT "guideLines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LikedGuidelines" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SavedGuidelines" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedGuidelines_AB_unique" ON "_LikedGuidelines"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedGuidelines_B_index" ON "_LikedGuidelines"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedGuidelines_AB_unique" ON "_SavedGuidelines"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedGuidelines_B_index" ON "_SavedGuidelines"("B");

-- AddForeignKey
ALTER TABLE "guideLines" ADD CONSTRAINT "guideLines_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedGuidelines" ADD CONSTRAINT "_LikedGuidelines_A_fkey" FOREIGN KEY ("A") REFERENCES "guideLines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedGuidelines" ADD CONSTRAINT "_LikedGuidelines_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedGuidelines" ADD CONSTRAINT "_SavedGuidelines_A_fkey" FOREIGN KEY ("A") REFERENCES "guideLines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedGuidelines" ADD CONSTRAINT "_SavedGuidelines_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
