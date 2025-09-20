"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { QUESTIONS } from "./mood-check-questions";

export async function handleMoodCheckSubmit(userId: string, formData: FormData) {
  const prisma = new PrismaClient();
  const scores = QUESTIONS.map((q: any, i: number) => Number(formData.get(`q${i}`)));
  const total = scores.reduce((a: number, b: number) => a + b, 0);
  const wellnessScore = Math.round((total / (QUESTIONS.length * 10)) * 100);
  await prisma.userData.update({
    where: { userId: userId },
    data: { wellnessScore, lastMoodCheck: new Date() },
  });
  redirect("/dashboard");
}
