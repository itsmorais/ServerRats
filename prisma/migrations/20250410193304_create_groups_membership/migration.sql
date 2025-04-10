-- CreateTable
CREATE TABLE "groupMemberships" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groupMemberships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groupMemberships_userId_groupId_key" ON "groupMemberships"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "groupMemberships" ADD CONSTRAINT "groupMemberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupMemberships" ADD CONSTRAINT "groupMemberships_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
