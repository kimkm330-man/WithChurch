import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { error } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <h1 className="text-3xl font-bold">WithChurch</h1>
      <p className="text-sm text-gray-500">
        Supabase connection: {error ? `error - ${error.message}` : "ok"}
      </p>
      <Link href="/login" className="text-sm text-blue-600 hover:underline">
        로그인
      </Link>

      <div className="mt-4 w-full max-w-sm space-y-3 rounded-lg border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">가입 유형을 선택해주세요</p>
        <Link
          href="/signup"
          className="block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          성도이신가요? &rarr; 회원가입
        </Link>
        <Link
          href="/admin-signup"
          className="block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          교회 관리자이신가요? &rarr; 교회 관리자 등록 신청
        </Link>
      </div>
    </main>
  );
}
