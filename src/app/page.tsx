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
    </main>
  );
}
