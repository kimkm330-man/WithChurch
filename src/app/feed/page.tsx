import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function FeedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-900">피드</h1>
      <p className="text-sm text-gray-600">아직 준비 중인 페이지입니다.</p>
      <LogoutButton />
    </main>
  );
}
