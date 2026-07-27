import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function RejectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-900">가입이 거부되었습니다</h1>
      <p className="max-w-sm text-sm text-gray-600">
        교회 관리자가 가입 요청을 거부했습니다. 자세한 내용은 교회
        관리자에게 문의해주세요.
      </p>
      <LogoutButton />
    </main>
  );
}
