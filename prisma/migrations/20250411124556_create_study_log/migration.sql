-- CreateTable
CREATE TABLE "studyLogs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "imageUrl" TEXT NOT NULL,
    "studiedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studyLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studyLogGroups" (
    "id" SERIAL NOT NULL,
    "studyLogId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "studyLogGroups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studyLogGroups_studyLogId_groupId_key" ON "studyLogGroups"("studyLogId", "groupId");

-- AddForeignKey
ALTER TABLE "studyLogs" ADD CONSTRAINT "studyLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studyLogGroups" ADD CONSTRAINT "studyLogGroups_studyLogId_fkey" FOREIGN KEY ("studyLogId") REFERENCES "studyLogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studyLogGroups" ADD CONSTRAINT "studyLogGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
