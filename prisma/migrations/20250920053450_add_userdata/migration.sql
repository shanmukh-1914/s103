-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "wellnessScore" INTEGER NOT NULL DEFAULT 70,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "todayGoals" JSONB NOT NULL DEFAULT [],
    "recentActivities" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_userId_key" ON "UserData"("userId");
