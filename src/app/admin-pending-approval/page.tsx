import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminPendingApprovalPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-900">
        플랫폼 운영자 승인을 기다리고 있습니다
      </h1>
      <p className="max-w-sm text-sm text-gray-600">
        등록 신청하신 교회 자체가 아직 승인 대기 중입니다. 플랫폼 운영자의
        승인이 완료되면 관리자 기능을 이용하실 수 있습니다.
      </p>
      <LogoutButton />
    </main>
  );
}
