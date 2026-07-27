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
      <div className="flex gap-4">
        <Link href="/login" className="text-sm text-blue-600 hover:underline">
          로그인
        </Link>
        <Link href="/signup" className="text-sm text-blue-600 hover:underline">
          회원가입
        </Link>
      </div>
    </main>
  );
}
