import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Onboarding({ userId }: { userId: string }) {
  // Example onboarding: set onboardingComplete to true after setup
  async function completeOnboarding() {
    "use server";
    const prisma = new PrismaClient();
    await prisma.user.update({ where: { id: userId }, data: { onboardingComplete: true } });
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
  <h2 className="text-2xl font-bold text-center">Welcome to ManasMitra!</h2>
  <p className="text-center text-muted-foreground">Let’s set up your ManasMitra journey.</p>
        {/* Add onboarding steps here (goals, streaks, etc.) */}
        <form action={completeOnboarding}>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Finish ManasMitra Onboarding
          </button>
        </form>
      </div>
    </div>
  );
}
