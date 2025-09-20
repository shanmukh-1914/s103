import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
      onboardingComplete: false,
    },
  });
  // Create fresh UserData for every new user
  await prisma.userData.create({
    data: {
      userId: user.id,
      wellnessScore: 0,
      streakDays: 0,
      todayGoals: JSON.stringify([
        { id: 1, title: "Practice deep breathing", completed: false },
        { id: 2, title: "Get 8 hours of sleep", completed: false },
        { id: 3, title: "Journal for 10 minutes", completed: false },
        { id: 4, title: "Take a mindful walk", completed: false },
      ]),
      recentActivities: JSON.stringify([]),
    },
  });
  return NextResponse.json({ success: true });
}
